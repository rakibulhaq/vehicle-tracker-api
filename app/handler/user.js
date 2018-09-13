const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const UnauthorizedError = require(APP_ERROR_PATH + 'unauthorized');

class UserHandler {
    constructor(){
        this._validator = require('validator');

    }
    static get USER_VALIDATION_SCHEME(){
        return{
            'firstName' : {
                notEmpty : true,
                isLength: {
                    options: [{min: 2, max : 20}],
                    errorMessage: 'first name must be between 2 and 15 charecters'
                },
                errorMessage: 'Invalid First Name'
            },
            'lastName' : {
                notEmpty: true,
                isLength: {
                    options: [{min : 2 , max : 20}],
                    errorMessage: 'last name must be between 2 and 20 characters'

                },
                errorMessage: 'Invalid Last Name'
            },
            'email':{
                isEmail:{
                    errorMessage : 'Invalid Email'
                },
                errorMessage : 'Invalid Email Provided'

            },
            'age':{
                notEmpty : true,
                numericality:{
                    onlyInteger: true,
                    noStrings: true,
                    greaterThan: 0
                }
            },
            'password':{
                notEmpty : true,
                isLength: {
                    options : [{min : 6, max: 35}],
                    errorMessage: 'passwrod must be between 6 and 35 characters'
                }
            }

        };
    }

    getUserInfo(req, userToken, callback){
        req.checkParams('id', 'invalid user id provided').isMongoId;
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map(function(elem){
                    return elem.msg;
                });
                throw new ValidationError('There have been some validation errors: ' + errorMessages); 
            }

            let userId = req.params.id;

            if(userId != userToken.id){
                throw new UnauthorizedError( 'Provide user id does not match with requested id');
            }
            else{
                return new Promise(function(resolve, reject){
                    UserModel.findById(userId, function(err, user){
                        if(user == null){

                        }
                        else{
                            resolve(user);
                        }
                    });

                });
            }
        })
        .then((user)=>{
            callback.onSuccess(user);
        })
        .catch((error)=>{
           callback.onError(error);
        });
    }
    createNewUser(req, callback){
        let data = req.body;
        let validator = this._validator;
        req.checkBody(UserHandler.USER_VALIDATION_SCHEME);
        req.getValidationResult()
        .then((result) =>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map(function(elem){
                    return elem.msg;
                });

                throw new ValidationError('There have been some validation error: '+ errorMessages);
            }
            return new UserModel({
                firstName : validator(data.firstName),
                lastName : validator(data.lastName),
                email : validator(data.email),
                age : validator(data.email),
                password : validator(data.password)
            });

        })
        .then((user)=>{
            return new Promise(function(resolve, reject){
                UserModel.find({email : user.email} , function(err, docs){
                    if(docs.length){
                        reject(new AlreadyExistsError('User already exists'));
                    }
                    else{
                        resolve(user);
                    }

                })

            });

        })
        .then((user)=>{
            user.save();
            return user;
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    updateUser(req, callback){

    }
    deleteUser(req, callback){

    }
    getAllUser(req, callback){

    }
}
module.exports = UserHandler;
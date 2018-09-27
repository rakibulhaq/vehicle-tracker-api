const UserModel = require(APP_MODEL_PATH + 'user').UserModel;
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
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
                    options: [{min: 2, max : 35}],
                    errorMessage: 'first name must be between 2 and 15 charecters'
                },
                errorMessage: 'Invalid First Name'
            },
            'lastName' : {
                notEmpty: true,
                isLength: {
                    options: [{min : 2 , max : 35}],
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
            'password':{
                notEmpty : true,
                isLength: {
                    options : [{min : 6, max: 35}],
                    errorMessage: 'password must be between 6 and 35 characters'
                }
            }

        };
    }

    getUserInfo(req, userToken, callback){
        req.checkParams('id', 'invalid user id provided').isMongoId();
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
                throw new UnauthorizedError( 'Provided user id does not match with requested id');
            }
            else{
                return new Promise(function(resolve, reject){
                    UserModel.findById(req.params.id, function(err, user){
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
                firstName : validator.trim(data.firstName),
                lastName : validator.trim(data.lastName),
                email : validator.trim(data.email),
                age : validator.trim(data.age),
                password : validator.trim(data.password),
                sex: data.sex,
                skills: data.skills,
                level: data.level,
                tier : data.tier,
                isMentor: data.isMentor,
                points: data.points,
                createdTime: Date.now(),
                status: data.status
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
        let data = req.body;
        
        return new Promise((resolve, reject)=>{
                UserModel.findOneAndUpdate({_id : req.params.id}, data, {new : true, upsert: true, runValidators : true}, (err, saved)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(saved);
                    }
                });
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    deleteUser(req, callback){
        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg
                });
                throw new ValidationError('There are some validation errors: ' + errorMessages);
            }

            return new Promise((resolve, reject)=>{
                UserModel.findOne({_id : req.params.id}, (err, user)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        if(!user){
                            reject(new NotFoundError('User Not Found'));
                        }
                        else{
                            resolve(user);
                        }
                    }
                });
            });

        })
        .then((user)=>{
            user.remove();
            return user;
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllUser(req, callback){
        return new Promise((resolve, reject)=>{
            UserModel.find({}, (err , docs)=>{
                if(err){
                    reject(err);

                }
                else{
                    resolve(docs);
                }
            });
        })
        .then((docs)=>{
            callback.onSuccess(docs);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
}
module.exports = UserHandler;
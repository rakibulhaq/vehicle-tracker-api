const UserModel = require('./user.model').User;
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
                            reject(user);
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
                phone : data.phone,
                age : data.age,
                password : validator.trim(data.password),
                imageUrl: data.imageUrl,
                sex: data.sex,
                skills: data.skills,
                level: data.level,
                tier : data.tier,
                services: data.services,    
                isMentor: data.isMentor,
                mentorLevel: data.mentorLevel,
                mentorPoints: data.mentorPoints,
                isMentoring: data.isMentoring,
                mentoringCounts: data.mentoringCounts,
                mentorRating : data.mentorRating,
                mentoringPlaces: data.mentoringPlaces,
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
            if(typeof req.query.operation != 'undefined' && req.query.operation == 'MentorStatus'){
                UserModel.findOneAndUpdate({_id : req.params.id}, {$set: {'isMentor': req.query.isMentor}}, {new : true, upsert: true, runValidators : true}, (err, saved)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(saved);
                    }
                });
            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'MentoringStatus'){
                UserModel.findOneAndUpdate({_id : req.params.id}, {$set: {'isMentoring': req.query.isMentoring}}, {new : true, upsert: true, runValidators : true}, (err, saved)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(saved);
                    }
                });
            }
            else{
                UserModel.findOneAndUpdate({_id : req.params.id}, data, {new : true, upsert: true, runValidators : true}, (err, saved)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(saved);
                    }
                });
            }
                
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
            if(typeof req.params.user_id != 'undefined' && req.query.operation == 'BasicUserData'){
                UserModel.find({_id : req.params.user_id}, (err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });

            }
            else if(req.query.operation == 'BasicMentorData' && typeof req.query.mentor_id == 'undefined'){

                let limit = 10;
                if(req.query.limit){
                    limit = parseInt(req.query.limit)
                }
                
                UserModel.find({'isMentoring' : true}, '_id name imageUrl designation skills address company industry services mentorRating hourlyRate')
                .populate('skills', 'name')
                .populate('industry', 'name')
                .populate('services', 'name')
                .sort({'name' : 'asc'})
                .limit(limit)
                .exec((err, docs)=>{
                    if(!err){
                        resolve(docs);
                    }
                    else{
                        reject(err);
                    }
                });        
                
            }
            else if(req.query.operation == 'DetailMentorData' && typeof req.query.mentor_id != 'undefined'){
                UserModel.find({'_id' : req.query.mentor_id, 'isMentoring' : true}, 'schedules mentoringCounts mentoringPlaces')
                .exec((err, docs)=>{
                    if(!err){
                        resolve(docs);
                    }
                    else{
                        reject(err);
                    }
                });
            }
            else if(req.query.operation == 'SpecificMentorData' && typeof req.query.mentor_id != 'undefined'){
                UserModel.find({'isMentoring' : true, 'industries' : {$in : req.query.industries}}, '_id name imageUrl designation skills address company industry services mentorRating hourlyRate')
                .populate('skills', 'name')
                .populate('industry', 'name')
                .populate('services', 'name')
                .sort({'hourlyRate' : req.query.order})
                .limit(parseInt(req.query.limit))
                .skip(parseInt(req.query.limit) * parseInt(req.query.page))
                .exec( (err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });
            }
            else{
                //catch all user get request
                UserModel.find({}, (err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });
            }
            
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
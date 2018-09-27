const UserActivityModel = require(APP_MODEL_PATH + 'user_activity').UserActivityModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');

class UserActivityHandler{
    constructor(){
        this._validator = require('validator');
    }

    createUserActivityInfo(req, callback){
        let data = req.body;
        let UserActivity = new UserActivityModel({
            user: data.user,
            activity: data.activity,
            activityTimeStart: data.activityTimeStart,
            activityTimeEnd: data.activityTimeEnd,
            activityDescription: data.activityDescription,
            pointsAwarded: data.pointsAwarded
        });

        return new Promise((resolve, reject)=>{
            UserActivityModel.find({name : data.name}, (err, someUserActivity)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(UserActivity);
                }

            });
        })
        .then((data)=>{
            data.save();
            return data;
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }

    getUserActivityInfo(req, callback){
        let UserActivityId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ValidationError("There are some validation errors: "+ errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    UserActivityModel.findById( UserActivityId, (err, UserActivity)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!UserActivity){
                                return new NotFoundError("UserActivity Not found");
                            }
                            else{
                                resolve(UserActivity);
                            }
                        }
                    });
                });
            }
        })
        .then((UserActivity)=>{
            callback.onSuccess(UserActivity);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateUserActivity(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            UserActivityModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteUserActivity(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting UserActivity: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    UserActivityModel.findOneAndDelete(id, (err, UserActivity)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(UserActivity);
                        }
                    });
                });  
            }
        })
        .then((UserActivity)=>{
            callback.onSuccess(UserActivity);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllUserActivity(req, callback){
        return new Promise((resolve, reject)=>{
            UserActivityModel.find({}, (err , docs)=>{
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
module.exports = UserActivityHandler;
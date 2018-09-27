const UserLevelModel = require(APP_MODEL_PATH + 'user_level').UserLevelModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserLevelHandler{
    constructor(){
        this._validator = require('validator');
    }

    createUserLevelInfo(req, callback){
        let data = req.body;
        let UserLevel = new UserLevelModel({
            name: data.name,
            pointsRequired: data.pointsRequired
        });

        return new Promise((resolve, reject)=>{
            UserLevelModel.find({name : data.name}, (err, someUserLevel)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(UserLevel);
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

    getUserLevelInfo(req, callback){
        let UserLevelId = req.params.id;
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
                    UserLevelModel.findById( UserLevelId, (err, UserLevel)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!UserLevel){
                                return new NotFoundError("UserLevel Not found");
                            }
                            else{
                                resolve(UserLevel);
                            }
                        }
                    });
                });
            }
        })
        .then((UserLevel)=>{
            callback.onSuccess(UserLevel);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateUserLevel(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            UserLevelModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteUserLevel(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting UserLevel: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    UserLevelModel.findOneAndDelete(id, (err, UserLevel)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(UserLevel);
                        }
                    });
                });  
            }
        })
        .then((UserLevel)=>{
            callback.onSuccess(UserLevel);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllUserLevel(req, callback){
        return new Promise((resolve, reject)=>{
            UserLevelModel.find({}, (err , docs)=>{
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
module.exports = UserLevelHandler;
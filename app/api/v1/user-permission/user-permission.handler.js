const UserPermissionModel = require('./user-permission.model').UserPermissionModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserPermissionHandler{
    constructor(){
        this._validator = require('validator');
    }

    createUserPermissionInfo(req, callback){
        let data = req.body;
        let UserPermission = new UserPermissionModel({
            user: data.user,
            permissions: data.permissions

        });

        return new Promise((resolve, reject)=>{
            UserPermissionModel.find({user : data.user}, (err, someUserPermission)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(UserPermission);
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

    getUserPermissionInfo(req, callback){
        let UserPermissionId = req.params.id;
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
                    UserPermissionModel.findById( UserPermissionId, (err, UserPermission)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!UserPermission){
                                return new NotFoundError("UserPermission Not found");
                            }
                            else{
                                resolve(UserPermission);
                            }
                        }
                    });
                });
            }
        })
        .then((UserPermission)=>{
            callback.onSuccess(UserPermission);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateUserPermission(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            UserPermissionModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteUserPermission(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting UserPermission: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    UserPermissionModel.findOneAndDelete(id, (err, UserPermission)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(UserPermission);
                        }
                    });
                });  
            }
        })
        .then((UserPermission)=>{
            callback.onSuccess(UserPermission);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllUserPermission(req, callback){
        return new Promise((resolve, reject)=>{
            UserPermissionModel.find({}, (err , docs)=>{
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
module.exports = UserPermissionHandler;
const PermissionModel = require('./permission.model').PermissionModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class PermissionHandler{
    constructor(){
        this._validator = require('validator');
    }

    createPermissionInfo(req, callback){
        let data = req.body;
        let permission = new PermissionModel({
            name : data.name,
            levelRequired: data.levelRequired
        });

        return new Promise((resolve, reject)=>{
            PermissionModel.find({name : data.name}, (err, somePermission)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(somePermission.length){
                        reject(new AlreadyExistsError('Activity Already Exists'));

                    }
                    else{
                        resolve(permission);
                    }
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

    getPermissionInfo(req, callback){
        let permissionId = req.params.id;
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
                    PermissionModel.findById( permissionId, (err, permission)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!permission){
                                return new NotFoundError("Permission Not found");
                            }
                            else{
                                resolve(permission);
                            }
                        }
                    });
                });
            }
        })
        .then((permission)=>{
            callback.onSuccess(permission);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updatePermission(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            PermissionModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deletePermission(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Permission: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PermissionModel.findOneAndDelete(id, (err, permission)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(permission);
                        }
                    });
                });  
            }
        })
        .then((permission)=>{
            callback.onSuccess(permission);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllPermission(req, callback){
        return new Promise((resolve, reject)=>{
            PermissionModel.find({}, (err , docs)=>{
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
module.exports = PermissionHandler;
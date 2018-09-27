const PackageModel = require(APP_MODEL_PATH + 'package').PackageModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class PackageHandler{
    constructor(){
        this._validator = require('validator');
    }

    createPackageInfo(req, callback){
        let data = req.body;
        let packageOne = new PackageModel({
            name : data.name,
            description: data.description,
            code: data.code,
            isActive: data.isActive,
            type: data.type,
            components: data.components
        });

        return new Promise((resolve, reject)=>{
            PackageModel.find({name : data.name}, (err, somePackage)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(somePackage.length){
                        reject(new AlreadyExistsError('Package Already Exists'));

                    }
                    else{
                        resolve(packageOne);
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

    getPackageInfo(req, callback){
        let packageId = req.params.id;
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
                    PackageModel.findById( packageId, (err, packageOne)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!packageOne){
                                return new NotFoundError("Activity Not found");
                            }
                            else{
                                resolve(packageOne);
                            }
                        }
                    });
                });
            }
        })
        .then((packageOne)=>{
            callback.onSuccess(packageOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updatePackage(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            PackageModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deletePackage(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Package: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PackageModel.findOneAndDelete(id, (err, packageOne)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(packageOne);
                        }
                    });
                });  
            }
        })
        .then((packageOne)=>{
            callback.onSuccess(packageOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllPackage(req, callback){
        return new Promise((resolve, reject)=>{
            PackageModel.find({}, (err , docs)=>{
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
module.exports = PackageHandler;
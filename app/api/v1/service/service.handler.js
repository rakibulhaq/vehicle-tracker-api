const ServiceModel = require('./service.model').ServiceModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class ServiceHandler{
    constructor(){
        this._validator = require('validator');
    }

    createServiceInfo(req, callback){
        let data = req.body;
        let Service = new ServiceModel({
            name: data.name,
            createdBy: data.createdBy,
            createdTime: Date.now()
        });

        return new Promise((resolve, reject)=>{
            ServiceModel.find({name : data.type}, (err, someService)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someService.length){
                        reject(new AlreadyExistsError('service Already Exists'));

                    }
                    else{
                        resolve(Service);
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

    getServiceInfo(req, callback){
        let ServiceId = req.params.id;
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
                    ServiceModel.findById( ServiceId, (err, Service)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!Service){
                                return new NotFoundError("Service Not found");
                            }
                            else{
                                resolve(Service);
                            }
                        }
                    });
                });
            }
        })
        .then((Service)=>{
            callback.onSuccess(Service);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateService(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            ServiceModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteService(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Service: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    ServiceModel.findOneAndDelete(id, (err, Service)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(Service);
                        }
                    });
                });  
            }
        })
        .then((Service)=>{
            callback.onSuccess(Service);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllService(req, callback){
        return new Promise((resolve, reject)=>{
            ServiceModel.find({}, (err , docs)=>{
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
module.exports = ServiceHandler;
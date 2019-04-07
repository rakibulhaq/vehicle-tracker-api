const IndustrySubsectionModel = require('./industry-subsection.model').IndustrySubsectionModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class IndustrySubsectionHandler{
    constructor(){
        this._validator = require('validator');
    }

    createIndustrySubsectionInfo(req, callback){
        let data = req.body;
        let industrySubsection = new IndustrySubsectionModel({
            name : data.name,
            description: data.description,
            industry: data.industry
        });

        return new Promise((resolve, reject)=>{
            IndustrySubsectionModel.find({name : data.name}, (err, someIndustrySubsection)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someIndustrySubsection.length){
                        reject(new AlreadyExistsError('IndustrySubsection Already Exists'));

                    }
                    else{
                        resolve(industrySubsection);
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

    getIndustrySubsectionInfo(req, callback){
        let industrySubsectionId = req.params.id;
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
                    IndustrySubsectionModel.findById( industrySubsectionId, (err, industrySubsection)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!industrySubsection){
                                return new NotFoundError("Activity Not found");
                            }
                            else{
                                resolve(industrySubsection);
                            }
                        }
                    });
                });
            }
        })
        .then((industrySubsection)=>{
            callback.onSuccess(industrySubsection);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateIndustrySubsection(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            IndustrySubsectionModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteIndustrySubsection(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Activity: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    IndustrySubsectionModel.findOneAndDelete(id, (err, industrySubsection)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(industrySubsection);
                        }
                    });
                });  
            }
        })
        .then((industrySubsection)=>{
            callback.onSuccess(industrySubsection);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllIndustrySubsection(req, callback){
        return new Promise((resolve, reject)=>{
            IndustrySubsectionModel.find({}, (err , docs)=>{
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
module.exports = IndustrySubsectionHandler;
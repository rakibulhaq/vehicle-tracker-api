const PersonalityTestResultModel = require('./personality-test-result.model').PersonalityTestResultModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
class PersonalityTestResultHandler{
    constructor(){
        this._validator = require('validator');
    }

    createPersonalityTestResultInfo(req, callback){
        let data = req.body;
        let PersonalityTestResultOne = new PersonalityTestResultModel({
            userId: data.userId,
            testId: data.testId,
            R: data.R,
            I: data.I,
            A: data.A,
            S: data.S,
            E: data.E,
            C: data.C
        });

        return new Promise((resolve, reject)=>{
            PersonalityTestResultModel.find({title : datitle}, (err, somePersonalityTestResult)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(somePersonalityTestResult.length){
                        // this.updatePersonalityTestResult(req, callback)
                        reject(new AlreadyExistsError('PersonalityTestResult Already Exists'));

                    }
                    else{
                        resolve(PersonalityTestResultOne);
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

    getPersonalityTestResultInfo(req, callback){
        let PersonalityTestResultId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorPersonalityTestResults = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ValidationError("There are some validation errors: "+ errorPersonalityTestResults);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PersonalityTestResultModel.findById( PersonalityTestResultId, (err, PersonalityTestResultOne)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!PersonalityTestResultOne){
                                return new NotFoundError("PersonalityTestResult Not found");
                            }
                            else{
                                resolve(PersonalityTestResultOne);
                            }
                        }
                    });
                });
            }
        })
        .then((PersonalityTestResultOne)=>{
            callback.onSuccess(PersonalityTestResultOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updatePersonalityTestResult(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            
                PersonalityTestResultModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deletePersonalityTestResult(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorPersonalityTestResults = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting PersonalityTestResult: " + errorPersonalityTestResults);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PersonalityTestResultModel.findOneAndDelete(id, (err, PersonalityTestResultOne)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(PersonalityTestResultOne);
                        }
                    });
                });  
            }
        })
        .then((PersonalityTestResultOne)=>{
            callback.onSuccess(PersonalityTestResultOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllPersonalityTestResult(req, callback){
        return new Promise((resolve, reject)=>{
            let conditions = {};
            if(typeof req.query.userId != 'undefined'){
                conditions['userId'] = req.query.userId;
            }

            if(typeof req.query.testId != 'undefined'){
                conditions['testId'] = req.query.testId;
            }
                PersonalityTestResultModel.find(conditions, (err , docs)=>{
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
module.exports = PersonalityTestResultHandler;
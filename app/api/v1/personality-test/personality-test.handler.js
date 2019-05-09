const PersonalityTestModel = require('./personality-test.model').PersonalityTestModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
class PersonalityTestHandler{
    constructor(){
        this._validator = require('validator');
    }

    createPersonalityTestInfo(req, callback){
        let data = req.body;
        let PersonalityTestOne = new PersonalityTestModel({
            title: data.title, 
            description: data.description,
            imagePath: data.imagePath,
            createdBy: data.createdBy
        });

        return new Promise((resolve, reject)=>{
            PersonalityTestModel.find({title : datitle}, (err, somePersonalityTest)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(somePersonalityTest.length){
                        reject(new AlreadyExistsError('PersonalityTest Already Exists'));

                    }
                    else{
                        resolve(PersonalityTestOne);
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

    getPersonalityTestInfo(req, callback){
        let PersonalityTestId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorPersonalityTests = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ValidationError("There are some validation errors: "+ errorPersonalityTests);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PersonalityTestModel.findById( PersonalityTestId, (err, PersonalityTestOne)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!PersonalityTestOne){
                                return new NotFoundError("PersonalityTest Not found");
                            }
                            else{
                                resolve(PersonalityTestOne);
                            }
                        }
                    });
                });
            }
        })
        .then((PersonalityTestOne)=>{
            callback.onSuccess(PersonalityTestOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updatePersonalityTest(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            
                PersonalityTestModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deletePersonalityTest(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorPersonalityTests = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting PersonalityTest: " + errorPersonalityTests);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PersonalityTestModel.findOneAndDelete(id, (err, PersonalityTestOne)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(PersonalityTestOne);
                        }
                    });
                });  
            }
        })
        .then((PersonalityTestOne)=>{
            callback.onSuccess(PersonalityTestOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllPersonalityTest(req, callback){
        return new Promise((resolve, reject)=>{
           
                PersonalityTestModel.find({}, (err , docs)=>{
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
module.exports = PersonalityTestHandler;
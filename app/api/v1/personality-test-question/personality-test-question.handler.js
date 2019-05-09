const PersonalityTestQuestionModel = require('./personality-test-question.model').PersonalityTestQuestionModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
class PersonalityTestQuestionHandler{
    constructor(){
        this._validator = require('validator');
    }

    createPersonalityTestQuestionInfo(req, callback){
        let data = req.body;
        let PersonalityTestQuestionOne = new PersonalityTestQuestionModel({
            question: data.question, 
            answerType: data.answerType,
            answers: data.answers,
            category: data.category,
            createdBy: data.createdBy
        });

        return new Promise((resolve, reject)=>{
            PersonalityTestQuestionModel.find({title : datitle}, (err, somePersonalityTestQuestion)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(somePersonalityTestQuestion.length){
                        reject(new AlreadyExistsError('PersonalityTestQuestion Already Exists'));

                    }
                    else{
                        resolve(PersonalityTestQuestionOne);
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

    getPersonalityTestQuestionInfo(req, callback){
        let PersonalityTestQuestionId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorPersonalityTestQuestions = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ValidationError("There are some validation errors: "+ errorPersonalityTestQuestions);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PersonalityTestQuestionModel.findById( PersonalityTestQuestionId, (err, PersonalityTestQuestionOne)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!PersonalityTestQuestionOne){
                                return new NotFoundError("PersonalityTestQuestion Not found");
                            }
                            else{
                                resolve(PersonalityTestQuestionOne);
                            }
                        }
                    });
                });
            }
        })
        .then((PersonalityTestQuestionOne)=>{
            callback.onSuccess(PersonalityTestQuestionOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updatePersonalityTestQuestion(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            
                PersonalityTestQuestionModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deletePersonalityTestQuestion(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorPersonalityTestQuestions = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting PersonalityTestQuestion: " + errorPersonalityTestQuestions);

            }
            else{
                return new Promise((resolve, reject)=>{
                    PersonalityTestQuestionModel.findOneAndDelete(id, (err, PersonalityTestQuestionOne)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(PersonalityTestQuestionOne);
                        }
                    });
                });  
            }
        })
        .then((PersonalityTestQuestionOne)=>{
            callback.onSuccess(PersonalityTestQuestionOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllPersonalityTestQuestion(req, callback){
        return new Promise((resolve, reject)=>{
            let conditions = {};
            if(typeof req.query.testId != 'undefined'){
                conditions['testId'] = req.query.testId;
            }
           
                PersonalityTestQuestionModel.find(conditions, (err , docs)=>{
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
module.exports = PersonalityTestQuestionHandler;
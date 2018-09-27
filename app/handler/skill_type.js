const SkillTypeModel = require(APP_MODEL_PATH + 'skill_type').SkillTypeModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class SkillTypeHandler{
    constructor(){
        this._validator = require('validator');
    }

    createSkillTypeInfo(req, callback){
        let data = req.body;
        let skillType = new SkillTypeModel({
            type: data.type,
            createdBy: data.createdBy,
            createdTime: Date.now()
        });

        return new Promise((resolve, reject)=>{
            SkillTypeModel.find({name : data.type}, (err, someSkillType)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someSkillType.length){
                        reject(new AlreadyExistsError('Skill Type Already Exists'));

                    }
                    else{
                        resolve(skillType);
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

    getSkillTypeInfo(req, callback){
        let skillTypeId = req.params.id;
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
                    SkillTypeModel.findById( skillTypeId, (err, skillType)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!skillType){
                                return new NotFoundError("Skill type Not found");
                            }
                            else{
                                resolve(skillType);
                            }
                        }
                    });
                });
            }
        })
        .then((skillType)=>{
            callback.onSuccess(skillType);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateSkillType(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            SkillTypeModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteSkillType(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting SkillType: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    SkillTypeModel.findOneAndDelete(id, (err, skillType)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(skillType);
                        }
                    });
                });  
            }
        })
        .then((skillType)=>{
            callback.onSuccess(skillType);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllSkillType(req, callback){
        return new Promise((resolve, reject)=>{
            SkillTypeModel.find({}, (err , docs)=>{
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
module.exports = SkillTypeHandler;
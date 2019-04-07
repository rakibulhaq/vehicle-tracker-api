const SkillModel = require('./skill.model').SkillModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class SkillHandler{
    constructor(){
        this._validator = require('validator');
    }

    createSkillInfo(req, callback){
        let data = req.body;
        let skill = new SkillModel({
            name: data.name,
            type: data.type,
            industrySubsection: data.industrySubsection
        });

        return new Promise((resolve, reject)=>{
            SkillModel.find({name : data.name}, (err, someSkill)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someSkill.length){
                        reject(new AlreadyExistsError('Skill Already Exists'));

                    }
                    else{
                        resolve(skill);
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

    getSkillInfo(req, callback){
        let skillId = req.params.id;
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
                    SkillModel.findById( skillId, (err, skill)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!skill){
                                return new NotFoundError("Skill Not found");
                            }
                            else{
                                resolve(skill);
                            }
                        }
                    });
                });
            }
        })
        .then((skill)=>{
            callback.onSuccess(skill);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateSkill(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            SkillModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteSkill(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Skill: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    SkillModel.findOneAndDelete(id, (err, skill)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(skill);
                        }
                    });
                });  
            }
        })
        .then((skill)=>{
            callback.onSuccess(skill);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllSkill(req, callback){
        return new Promise((resolve, reject)=>{
            SkillModel.find({}, (err , docs)=>{
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
module.exports = SkillHandler;
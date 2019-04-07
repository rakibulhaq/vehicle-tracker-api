const UserMentorModel = require('./user-mentor.model').UserMentorModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserMentorHandler{
    constructor(){
        this._validator = require('validator');
    }

    createUserMentorInfo(req, callback){
        let data = req.body;
        let UserMentor = new UserMentorModel({
            user: data.user,
            industrySubsection: data.industrySubsection,
            mentorLevel: data.mentorLevel,
            mentorPoints: data.mentorPoints,
            isMentoring: data.isMentoring,
            mentoringCounts: data.mentoringCounts,
            mentorRating : data.mentorRating
        });

        return new Promise((resolve, reject)=>{
            UserMentorModel.find({name : data.name}, (err, someUserMentor)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(UserMentor);
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

    getUserMentorInfo(req, callback){
        let UserMentorId = req.params.id;
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
                    UserMentorModel.findById( UserMentorId, (err, UserMentor)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!UserMentor){
                                return new NotFoundError("UserMentor Not found");
                            }
                            else{
                                resolve(UserMentor);
                            }
                        }
                    });
                });
            }
        })
        .then((UserMentor)=>{
            callback.onSuccess(UserMentor);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateUserMentor(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            UserMentorModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteUserMentor(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting UserMentor: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    UserMentorModel.findOneAndDelete(id, (err, UserMentor)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(UserMentor);
                        }
                    });
                });  
            }
        })
        .then((UserMentor)=>{
            callback.onSuccess(UserMentor);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllUserMentor(req, callback){
        return new Promise((resolve, reject)=>{
            UserMentorModel.find({}, (err , docs)=>{
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
module.exports = UserMentorHandler;
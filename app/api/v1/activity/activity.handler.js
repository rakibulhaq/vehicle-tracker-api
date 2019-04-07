const ActivityModel = require('./activity.model').ActivityModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class ActivityHandler{
    constructor(){
        this._validator = require('validator');
    }

    createActivityInfo(req, callback){
        let data = req.body;
        let activity = new ActivityModel({
            name : data.name,
            points: data.points,
            type: data.type,
            isActive: data.isActive
        });

        return new Promise((resolve, reject)=>{
            ActivityModel.find({name : data.name}, (err, someActivity)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someActivity.length){
                        reject(new AlreadyExistsError('Activity Already Exists'));

                    }
                    else{
                        resolve(activity);
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

    getActivityInfo(req, callback){
        let activityId = req.params.id;
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
                    ActivityModel.findById( activityId, (err, activity)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!activity){
                                return new NotFoundError("Activity Not found");
                            }
                            else{
                                resolve(activity);
                            }
                        }
                    });
                });
            }
        })
        .then((activity)=>{
            callback.onSuccess(activity);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateActivity(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            ActivityModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteActivity(req, callback){
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
                    ActivityModel.findOneAndDelete(id, (err, activity)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(activity);
                        }
                    });
                });  
            }
        })
        .then((activity)=>{
            callback.onSuccess(activity);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllActivity(req, callback){
        return new Promise((resolve, reject)=>{
            ActivityModel.find({}, (err , docs)=>{
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
module.exports = ActivityHandler;
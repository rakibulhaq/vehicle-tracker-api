const NotificationModel = require('./notification.model').NotificationModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
class NotificationHandler{
    constructor(){
        this._validator = require('validator');
    }

    createNotificationInfo(req, callback){
        let data = req.body;
        let NotificationOne = new NotificationModel({
            userId: data.userId,
            text: data.text,
            type: data.type
        });

        return new Promise((resolve, reject)=>{
            NotificationModel.find({name : data.name}, (err, someNotification)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someNotification.length){
                        reject(new AlreadyExistsError('Notification Already Exists'));

                    }
                    else{
                        resolve(NotificationOne);
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

    getNotificationInfo(req, callback){
        let NotificationId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorNotifications = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new ValidationError("There are some validation errors: "+ errorNotifications);

            }
            else{
                return new Promise((resolve, reject)=>{
                    NotificationModel.findById( NotificationId, (err, NotificationOne)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!NotificationOne){
                                return new NotFoundError("Notification Not found");
                            }
                            else{
                                resolve(NotificationOne);
                            }
                        }
                    });
                });
            }
        })
        .then((NotificationOne)=>{
            callback.onSuccess(NotificationOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateNotification(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            if(typeof req.query.seenStatus != 'undefined'){
                NotificationModel.findOneAndUpdate({_id : req.params.id}, {seenStatus : req.query.seenStatus}, {new : true}, (err, saved)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(saved);
                    }
                });

            }
            else {
                NotificationModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(saved);
                    }
                });

            }
            
        })
        .then((saved)=>{
            callback.onSuccess(saved);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    deleteNotification(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorNotifications = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Notification: " + errorNotifications);

            }
            else{
                return new Promise((resolve, reject)=>{
                    NotificationModel.findOneAndDelete(id, (err, NotificationOne)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(NotificationOne);
                        }
                    });
                });  
            }
        })
        .then((NotificationOne)=>{
            callback.onSuccess(NotificationOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllNotification(req, callback){
        return new Promise((resolve, reject)=>{
            let condition = {};
            //smses of a user both seen and unseen and all Notifications
            if(typeof req.query.userId != 'undefined'){

                condition['userId'] = req.query.userId;

                if(typeof req.query.status != 'undefined'){

                    condition['seenStatus'] = req.query.status;
                }

                NotificationModel.find(condition)
                .sort({'sentTime' : req.query.order})
                .skip(parseInt(req.query.limit) * (parseInt(req.query.page) - 1))
                .limit(parseInt(req.query.limit))
                .exec((err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });

            }
            else{
                NotificationModel.find({}, (err , docs)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(docs);
                    }
                });

            }
           
        })
        .then((docs)=>{
            callback.onSuccess(docs);
        })
        .catch((error)=>{
            callback.onError(error);
        });
    }
}
module.exports = NotificationHandler;
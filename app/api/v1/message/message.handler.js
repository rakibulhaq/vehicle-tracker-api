const MessageModel = require('./message.model').MessageModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
class MessageHandler{
    constructor(){
        this._validator = require('validator');
    }

    createMessageInfo(req, callback){
        let data = req.body;
        let MessageOne = new MessageModel({
            sessionId: data.sessionId,
            text: data.text, 
            sentBy: data.sentBy
        });

        return new Promise((resolve, reject)=>{
            MessageModel.find({name : data.name}, (err, someMessage)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someMessage.length){
                        reject(new AlreadyExistsError('Message Already Exists'));

                    }
                    else{
                        resolve(MessageOne);
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

    getMessageInfo(req, callback){
        let MessageId = req.params.id;
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
                    MessageModel.findById( MessageId, (err, MessageOne)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!MessageOne){
                                return new NotFoundError("Message Not found");
                            }
                            else{
                                resolve(MessageOne);
                            }
                        }
                    });
                });
            }
        })
        .then((MessageOne)=>{
            callback.onSuccess(MessageOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateMessage(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            if(typeof req.query.seenStatus != 'undefined'){
                MessageModel.findOneAndUpdate({_id : req.params.id}, {seenStatus : req.query.seenStatus}, {new : true}, (err, saved)=>{
                    if(err){
                        reject(err);
    
                    }
                    else{
                        resolve(saved);
                    }
                });

            }
            else {
                MessageModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteMessage(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Message: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    MessageModel.findOneAndDelete(id, (err, MessageOne)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(MessageOne);
                        }
                    });
                });  
            }
        })
        .then((MessageOne)=>{
            callback.onSuccess(MessageOne);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllMessage(req, callback){
        return new Promise((resolve, reject)=>{
            //smses of a user both seen and unseen and all messages
            if(typeof req.query.userId != 'undefined'){
                let condition = {sentBy : req.query.userId};
                if(typeof req.query.seenStatus != 'undefined'){
                    condition = {sentBy: req.query.userId, seenStatus: req.query.status};
                }
                MessageModel.find(condition)
                .sort({'sentTime' : req.query.order})
                .skip(parseInt(req.query.limit) * parseInt(req.query.page))
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
                MessageModel.find({}, (err , docs)=>{
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
module.exports = MessageHandler;
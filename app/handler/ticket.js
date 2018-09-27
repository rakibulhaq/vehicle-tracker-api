const TicketModel = require(APP_MODEL_PATH + 'ticket').TicketModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class TicketHandler{
    constructor(){
        this._validator = require('validator');
    }

    createTicketInfo(req, callback){
        let data = req.body;
        let Ticket = new TicketModel({
            name: data.name,
            type: data.type,
            createdTime: Date.now(),
            createdBy: data.createdBy
        });

        return new Promise((resolve, reject)=>{
            TicketModel.find({name : data.name}, (err, someTicket)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someTicket.length){
                        reject(new AlreadyExistsError('Ticket Already Exists'));

                    }
                    else{
                        resolve(Ticket);
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

    getTicketInfo(req, callback){
        let TicketId = req.params.id;
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
                    TicketModel.findById( TicketId, (err, Ticket)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!Ticket){
                                return new NotFoundError("Ticket Not found");
                            }
                            else{
                                resolve(Ticket);
                            }
                        }
                    });
                });
            }
        })
        .then((Ticket)=>{
            callback.onSuccess(Ticket);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateTicket(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            TicketModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteTicket(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Ticket: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    TicketModel.findOneAndDelete(id, (err, Ticket)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(Ticket);
                        }
                    });
                });  
            }
        })
        .then((Ticket)=>{
            callback.onSuccess(Ticket);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllTicket(req, callback){
        return new Promise((resolve, reject)=>{
            TicketModel.find({}, (err , docs)=>{
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
module.exports = TicketHandler;
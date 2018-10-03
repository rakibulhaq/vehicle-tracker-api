const UserTicketModel = require(APP_MODEL_PATH + 'user_ticket').UserTicketModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserTicketHandler {
    constructor() {
        this._validator = require('validator');
    }

    createUserTicketInfo(req, callback) {
        let data = req.body;
        let UserTicket = new UserTicketModel({
            user: data.user,
            ticket: data.ticket,
            ticketStatus: data.ticketStatus,
            ticketOpenBy: data.ticketOpenBy,
            ticketOpenTime: data.ticketOpenTime,
            ticketAssignedTo: data.ticketAssignedTo,
            ticketAssignedTime: data.ticketAssignedTime,
            ticketAssignedBy: data.ticketAssignedBy,
            ticketClosedBy: data.ticketClosedBy,
            ticketClosedTime: data.ticketClosedTime

        });

        return new Promise((resolve, reject) => {
            UserTicketModel.find({ user: data.user }, (err, someUserTicket) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(UserTicket);
                }

            });
        })
            .then((data) => {
                data.save();
                return data;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }

    getUserTicketInfo(req, callback) {
        let UserTicketId = req.params.id;
        req.checkParams('id', 'invalid id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new ValidationError("There are some validation errors: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        UserTicketModel.findById(UserTicketId, (err, UserTicket) => {
                            if (err) {
                                reject(err);

                            }
                            else {
                                if (!UserTicket) {
                                    return new NotFoundError("UserTicket Not found");
                                }
                                else {
                                    resolve(UserTicket);
                                }
                            }
                        });
                    });
                }
            })
            .then((UserTicket) => {
                callback.onSuccess(UserTicket);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }
    updateUserTicket(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            UserTicketModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, saved) => {
                if (err) {
                    reject(err);

                }
                else {
                    resolve(saved);
                }
            });
        })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    deleteUserTicket(req, callback) {
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new Error("There has been an error during deleting UserTicket: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        UserTicketModel.findOneAndDelete(id, (err, UserTicket) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(UserTicket);
                            }
                        });
                    });
                }
            })
            .then((UserTicket) => {
                callback.onSuccess(UserTicket);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllUserTicket(req, callback) {
        return new Promise((resolve, reject) => {
            UserTicketModel.find({}, (err, docs) => {
                if (err) {
                    reject(err);

                }
                else {

                    resolve(docs);
                }
            });
        })
            .then((docs) => {
                callback.onSuccess(docs);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
}
module.exports = UserTicketHandler;
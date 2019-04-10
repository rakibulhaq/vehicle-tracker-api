const UserSessionModel = require('./user-session.model').UserSessionModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserSessionHandler {
    constructor() {
        this._validator = require('validator');
    }

    createUserSessionInfo(req, callback) {
        let data = req.body;
        let UserSession = new UserSessionModel({
            userId: data.userId,
            mentorId: data.mentorId,
            sessionStatus: data.sessionStatus,
            sessionRequestedTime: data.sessionRequestedTime,
            requestReviewedTime: data.requestReviewedTime,
            sessionStartTime: data.sessionStartTime,
            sessionEndTime: data.sessionEndTime,
            serviceOffered: data.serviceOffered,
            sessionSpot: data.sessionSpot,
            sessionReviewUser: data.sessionReviewUser,
            sessionRatingUser: data.sessionRatingUser,
            sessionReviewMentor: data.sessionReviewMentor,
            sessionRatingMentor: data.sessionRatingMentor,
            paymentStatus: data.paymentStatus,
            paymentTime: data.paymentTime,
            paymentMedium: data.paymentMedium,
            remarks: data.remarks
        });

        return new Promise((resolve, reject) => {
            UserSessionModel.find({ name: data.name }, (err, someUserSession) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(UserSession);
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

    getUserSessionInfo(req, callback) {
        let UserSessionId = req.params.id;
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
                        UserSessionModel.findById(UserSessionId, (err, UserSession) => {
                            if (err) {
                                reject(err);

                            }
                            else {
                                if (!UserSession) {
                                    return new NotFoundError("UserSession Not found");
                                }
                                else {
                                    resolve(UserSession);
                                }
                            }
                        });
                    });
                }
            })
            .then((UserSession) => {
                callback.onSuccess(UserSession);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }
    updateUserSession(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            UserSessionModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, saved) => {
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
    deleteUserSession(req, callback) {
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new Error("There has been an error during deleting UserSession: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        UserSessionModel.findOneAndDelete(id, (err, UserSession) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(UserSession);
                            }
                        });
                    });
                }
            })
            .then((UserSession) => {
                callback.onSuccess(UserSession);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllUserSession(req, callback) {
        return new Promise((resolve, reject) => {
            UserSessionModel.find({}, (err, docs) => {
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
module.exports = UserSessionHandler;
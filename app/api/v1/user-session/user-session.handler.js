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
            invoiceId: data.invoiceId,
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
            //summary count of user session
            if(typeof req.query.operation != 'undefined' && req.query.operation == 'Summary'){
                //count active, pending, completed
                if(typeof req.query.userId != 'undefined'){
                    UserSessionModel.aggregate([
                        {
                            $match: {
                                "userId": req.query.userId
                            }
                        },
                        {
                            $group: {
                                _id: '$_id',
                                activeSessions: { $sum: {
                                    '$cond': [
                                        { '$eq': ['$sessionStatus', 'Active']}, 
                                        1, 
                                        0
                                    ]
                                } },
                                pendingSessions: { $sum: {
                                    '$cond': [
                                        { '$eq': ['$sessionStatus', 'Pending']}, 
                                        1, 
                                        0
                                    ]
                                } },
                                completedSessions: { $sum: {
                                    '$cond': [
                                        { '$eq': ['$sessionStatus', 'Complete']}, 
                                        1, 
                                        0
                                    ]
                                } } 
                            }
                        },
                        {
                            $project: {
                                "_id": 1,
                                "activeSessions": 1,
                                "pendingSessions": 1,
                                "completedSessions": 1
                            }
                        }
                    ],
                        (err, docs) => {
                            if (!err) {
                                // console.log(docs)
                                resolve(docs)
                            }
                            else {
                                reject(err)
                            }
    
                        });

                }
                else if(typeof req.query.mentorId != 'undefined'){
                    UserSessionModel.aggregate([
                        {
                            $match: {
                                "mentorId": req.query.mentorId
                            }
                        },
                        {
                            $group: {
                                _id: '$_id',
                                activeSessions: { $sum: {
                                    '$cond': [
                                        { '$eq': ['$sessionStatus', 'Active']}, 
                                        1, 
                                        0
                                    ]
                                } },
                                pendingSessions: { $sum: {
                                    '$cond': [
                                        { '$eq': ['$sessionStatus', 'Pending']}, 
                                        1, 
                                        0
                                    ]
                                } },
                                completedSessions: { $sum: {
                                    '$cond': [
                                        { '$eq': ['$sessionStatus', 'Complete']}, 
                                        1, 
                                        0
                                    ]
                                } } 
                            }
                        },
                        {
                            $project: {
                                "_id": 1,
                                "activeSessions": 1,
                                "pendingSessions": 1,
                                "completedSessions": 1
                            }
                        }
                    ],
                        (err, docs) => {
                            if (!err) {
                                // console.log(docs)
                                resolve(docs)
                            }
                            else {
                                reject(err)
                            }
    
                        });

                }
                
                

            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'Info'){
                UserSessionModel.find({_id : req.query.id}, (err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });
            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'ModifiedMentorInfo'){
                UserSessionModel.find({_id : req.query.id}, 'sessionModifiedStartTime sessionModifiedSpot', (err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });
            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'Reviews'){
                UserSessionModel.find({_id : req.query.id}, 'sessionReviewUser sessionRatingUser sessionReviewMentor sessionRatingMentor', (err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });
            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'UserReviews'){
                //find user given reviews
                UserSessionModel.find({userId : req.query.userId}, 'sessionReviewUser sessionRatingUser' ,(err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });

            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'UserReviewsFromMentors'){
                //find user given reviews
                UserSessionModel.find({userId : req.query.userId}, 'sessionReviewMentor sessionRatingMentor' ,(err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });

            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'MentorReviews'){
                //find mentor given reviews
                UserSessionModel.find({mentorId : req.query.mentorId},'sessionReviewMentor sessionRatingMentor' , (err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });

            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'MentorReviewsFromUser'){
                //find reviews given to a mentor
                UserSessionModel.find({mentorId : req.query.mentorId},'sessionReviewUser sessionRatingUser' , (err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });

            }
            else if(typeof req.query.operation != 'undefined' && req.query.operation == 'Sessions'){
                let conditions = {}
                //find different types of sessions for a given user or mentor
                if(req.query.mode == 'Mentor'){
                    conditions = {mentorId : req.query.userId};

                }
                else if(req.query.mode == 'User'){
                    conditions = {userId : req.query.userId};

                }

                conditions["status"] = req.query.type;

                UserSessionModel.find(conditions)
                .sort({'createdTime' : req.query.order})
                .skip((parseInt(req.query.page) - 1 ) * parseInt(req.query.limit))
                .limit(parseInt(req.query.limit))
                .exec((err, res)=>{
                    if(!err){
                        resolve(res)
                    }
                    else{
                        reject(err)
                    }
                });

            }
            else{

                UserSessionModel.find({}, (err, docs) => {
                    if (err) {
                        reject(err);
    
                    }
                    else {
    
                        resolve(docs);
                    }
                });
                
            }
           
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
const UserTierModel = require(APP_MODEL_PATH + 'user_tier').UserTierModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserTierHandler {
    constructor() {
        this._validator = require('validator');
    }

    createUserTierInfo(req, callback) {
        let data = req.body;
        let UserTier = new UserTierModel({
            name: data.name,
            isActive: data.isActive

        });

        return new Promise((resolve, reject) => {
            UserTierModel.find({ name: data.name }, (err, someUserTier) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(UserTier);
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

    getUserTierInfo(req, callback) {
        let UserTierId = req.params.id;
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
                        UserTierModel.findById(UserTierId, (err, UserTier) => {
                            if (err) {
                                reject(err);

                            }
                            else {
                                if (!UserTier) {
                                    return new NotFoundError("UserTier Not found");
                                }
                                else {
                                    resolve(UserTier);
                                }
                            }
                        });
                    });
                }
            })
            .then((UserTier) => {
                callback.onSuccess(UserTier);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }
    updateUserTier(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            UserTierModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, saved) => {
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
    deleteUserTier(req, callback) {
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new Error("There has been an error during deleting UserTier: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        UserTierModel.findOneAndDelete(id, (err, UserTier) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(UserTier);
                            }
                        });
                    });
                }
            })
            .then((UserTier) => {
                callback.onSuccess(UserTier);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllUserTier(req, callback) {
        return new Promise((resolve, reject) => {
            UserTierModel.find({}, (err, docs) => {
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
module.exports = UserTierHandler;
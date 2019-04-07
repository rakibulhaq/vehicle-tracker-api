const UserPurchaseModel = require('./user-purchase.model').UserPurchaseModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserPurchaseHandler {
    constructor() {
        this._validator = require('validator');
    }

    createUserPurchaseInfo(req, callback) {
        let data = req.body;
        let UserPurchase = new UserPurchaseModel({
            user: data.user,
            package: data.package,
            purchaseCode: data.purchaseCode,
            purchaseRating: data.purchaseRating,
            purchaseDate: data.purchaseDate,
            expiryDate: data.expiryDate,
            isExpired: data.isExpired,
            actualPrice: data.actualPrice,
            discountedPrice: data.discountedPrice,
            couponUsed: data.couponUsed

        });

        return new Promise((resolve, reject) => {
            UserPurchaseModel.find({ user: data.user }, (err, someUserPurchase) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(UserPurchase);
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

    getUserPurchaseInfo(req, callback) {
        let UserPurchaseId = req.params.id;
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
                        UserPurchaseModel.findById(UserPurchaseId, (err, UserPurchase) => {
                            if (err) {
                                reject(err);

                            }
                            else {
                                if (!UserPurchase) {
                                    return new NotFoundError("UserPurchase Not found");
                                }
                                else {
                                    resolve(UserPurchase);
                                }
                            }
                        });
                    });
                }
            })
            .then((UserPurchase) => {
                callback.onSuccess(UserPurchase);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }
    updateUserPurchase(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            UserPurchaseModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, saved) => {
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
    deleteUserPurchase(req, callback) {
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new Error("There has been an error during deleting UserPurchase: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        UserPurchaseModel.findOneAndDelete(id, (err, UserPurchase) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(UserPurchase);
                            }
                        });
                    });
                }
            })
            .then((UserPurchase) => {
                callback.onSuccess(UserPurchase);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllUserPurchase(req, callback) {
        return new Promise((resolve, reject) => {
            UserPurchaseModel.find({}, (err, docs) => {
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
module.exports = UserPurchaseHandler;
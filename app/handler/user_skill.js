const UserSkillModel = require(APP_MODEL_PATH + 'user_skill').UserSkillModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserSkillHandler {
    constructor() {
        this._validator = require('validator');
    }

    createUserSkillInfo(req, callback) {
        let data = req.body;
        let UserSkill = new UserSkillModel({
            user: data.user,
            skills: data.skills

        });

        return new Promise((resolve, reject) => {
            UserSkillModel.find({ user: data.user }, (err, someUserSkill) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(UserSkill);
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

    getUserSkillInfo(req, callback) {
        let UserSkillId = req.params.id;
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
                        UserSkillModel.findById(UserSkillId, (err, UserSkill) => {
                            if (err) {
                                reject(err);

                            }
                            else {
                                if (!UserSkill) {
                                    return new NotFoundError("UserSkill Not found");
                                }
                                else {
                                    resolve(UserSkill);
                                }
                            }
                        });
                    });
                }
            })
            .then((UserSkill) => {
                callback.onSuccess(UserSkill);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }
    updateUserSkill(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            UserSkillModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, saved) => {
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
    deleteUserSkill(req, callback) {
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new Error("There has been an error during deleting UserSkill: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        UserSkillModel.findOneAndDelete(id, (err, UserSkill) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(UserSkill);
                            }
                        });
                    });
                }
            })
            .then((UserSkill) => {
                callback.onSuccess(UserSkill);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllUserSkill(req, callback) {
        return new Promise((resolve, reject) => {
            UserSkillModel.find({}, (err, docs) => {
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
module.exports = UserSkillHandler;
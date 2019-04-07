const ComponentModel = require('./component.model').ComponentModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class ComponentHandler {
    constructor() {
        this._validator = require('validator');
    }

    createComponentInfo(req, callback) {
        let data = req.body;
        let Component = new ComponentModel({
            name: data.name,
            descriptionShort: data.descriptionShort,
            descriptionFull: data.descriptionFull,
            price: data.price,
            isActive: data.isActive,
            imgPath: data.imgPath,
            saleCount: data.saleCount,
            rating: data.rating

        });

        return new Promise((resolve, reject) => {
            ComponentModel.find({ name: data.name }, (err, someComponent) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(Component);
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

    getComponentInfo(req, callback) {
        let ComponentId = req.params.id;
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
                        ComponentModel.findById(ComponentId, (err, Component) => {
                            if (err) {
                                reject(err);

                            }
                            else {
                                if (!Component) {
                                    return new NotFoundError("Component Not found");
                                }
                                else {
                                    resolve(Component);
                                }
                            }
                        });
                    });
                }
            })
            .then((Component) => {
                callback.onSuccess(Component);
            })
            .catch((error) => {
                callback.onError(error);
            });


    }
    updateComponent(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            ComponentModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, saved) => {
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
    deleteComponent(req, callback) {
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg;
                    });

                    throw new Error("There has been an error during deleting Component: " + errorMessages);

                }
                else {
                    return new Promise((resolve, reject) => {
                        ComponentModel.findOneAndDelete(id, (err, Component) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(Component);
                            }
                        });
                    });
                }
            })
            .then((Component) => {
                callback.onSuccess(Component);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllComponent(req, callback) {
        return new Promise((resolve, reject) => {
            ComponentModel.find({}, (err, docs) => {
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
module.exports = ComponentHandler;
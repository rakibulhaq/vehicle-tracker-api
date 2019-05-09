const UserModel = require('./user.model').User;
const AlreadyExistsError = require(APP_ERROR_PATH + 'already_exists');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');
const ValidationError = require(APP_ERROR_PATH + 'validation');
const UnauthorizedError = require(APP_ERROR_PATH + 'unauthorized');
const ObjectId = require('mongoose').Types.ObjectId;

class UserHandler {
    constructor() {
        this._validator = require('validator');
    }
    static get USER_VALIDATION_SCHEME() {
        return {
            'userName': {
                notEmpty: true,
                errorMessage: 'User Name Must not Be Empty'
            },
            'password': {
                notEmpty: true,
                isLength: {
                    options: [{ min: 6, max: 35 }],
                    errorMessage: 'password must be between 6 and 35 characters'
                }
            }

        };
    }

    getUserInfo(req, userToken, callback) {
        req.checkParams('id', 'invalid user id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There have been some validation errors: ' + errorMessages);
                }

                let userId = req.params.id;

                if (userId != userToken.id) {
                    throw new UnauthorizedError('Provided user id does not match with requested id');
                }
                else {
                    return new Promise(function (resolve, reject) {
                        UserModel.findById(req.params.id, function (err, user) {
                            if (user == null) {
                                reject(user);
                            }
                            else {
                                resolve(user);
                            }
                        });

                    });
                }
            })
            .then((user) => {
                callback.onSuccess(user);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    createNewUser(req, callback) {
        let data = req.body;
        let validator = this._validator;
        req.checkBody(UserHandler.USER_VALIDATION_SCHEME);
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });

                    throw new ValidationError('There have been some validation error: ' + errorMessages);
                }
                let phoneNo = ''
                let email = ''
                if (isNaN(data.userName) && typeof data.email == 'undefined') {
                    email = data.userName
                }
                else if (typeof data.phone == 'undefined') {
                    phoneNo = data.userName
                }
                return new UserModel({

                    userName: validator.trim(data.userName),
                    name: data.name,
                    email: email == '' ? data.email : email,
                    phone: phoneNo == '' ? data.phone : phoneNo,
                    age: data.age,
                    password: validator.trim(data.password),
                    imageUrl: data.imageUrl,
                    sex: data.sex,
                    skills: data.skills,
                    level: data.level,
                    tier: data.tier,
                    education: data.education,
                    bio: data.bio,
                    industry: data.industry,
                    university: data.university,
                    employmentStatus: data.employmentStatus,
                    experience: data.experience,
                    references: data.references,
                    recommendations: data.recommendations,
                    topSkills: data.topSkills,
                    schedules: data.schedules,
                    services: data.services,
                    isMentor: data.isMentor,
                    mentorLevel: data.mentorLevel,
                    mentorPoints: data.mentorPoints,
                    isMentoring: data.isMentoring,
                    mentoringCounts: data.mentoringCounts,
                    mentorRating: data.mentorRating,
                    mentoringPlaces: data.mentoringPlaces,
                    points: data.points,
                    createdTime: Date.now(),
                    status: data.status
                });

            })
            .then((user) => {
                return new Promise(function (resolve, reject) {
                    UserModel.find({ userName: user.userName }, function (err, docs) {
                        if (docs.length) {
                            reject(new AlreadyExistsError('User already exists with the userName'));
                        }
                        else {
                            resolve(user);
                        }

                    })

                });

            })
            .then((user) => {
                user.save();
                return user;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    updateUser(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {

            UserModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true, upsert: true, runValidators: true }, (err, saved) => {
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
    deleteUser(req, callback) {
        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map((elem) => {
                        return elem.msg
                    });
                    throw new ValidationError('There are some validation errors: ' + errorMessages);
                }

                return new Promise((resolve, reject) => {
                    UserModel.findOne({ _id: req.params.id }, (err, user) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (!user) {
                                reject(new NotFoundError('User Not Found'));
                            }
                            else {
                                resolve(user);
                            }
                        }
                    });
                });

            })
            .then((user) => {
                user.remove();
                return user;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllUser(req, callback) {
        return new Promise((resolve, reject) => {
            if (typeof req.query.user_id != 'undefined' && req.query.operation == 'BasicUserData') {
                UserModel.find({ _id: req.query.user_id }, '_id userName name imageUrl', (err, docs) => {
                    if (err) {
                        reject(err);

                    }
                    else {
                        resolve(docs);
                    }
                });

            }
            else if (typeof req.query.user_id != 'undefined' && req.query.operation == 'DetailUserData') {
                UserModel.find({ _id: req.query.user_id }, '_id userName name imageUrl bio education employmentStatus university skills company designation address email phone', (err, docs) => {
                    if (err) {
                        reject(err);

                    }
                    else {
                        resolve(docs);
                    }
                });

            }
            else if (req.query.operation == 'BasicMentorData' && typeof req.query.mentor_id == 'undefined') {

                let limit = 10;
                if (req.query.limit) {
                    limit = parseInt(req.query.limit);
                }
                let conditions = {isMentoring: true};
                if(typeof req.query.pricerange != 'undefined'){
                    let priceRange =  req.query.pricerange.split('-')
                    conditions = {isMentoring : true, $and : [ { hourlyRate : {$gte: parseInt(priceRange[0])}}, { hourlyRate : {$lte: parseInt(priceRange[1])}}]}
                }

                UserModel.find(conditions, '_id name imageUrl designation skills address bio company industry services mentorRating hourlyRate')
                    .populate('skills', 'name')
                    .populate('industry', 'name')
                    .populate('services', 'name')
                    .sort({ 'name': 'asc' })
                    .skip((parseInt(req.query.page) - 1) * parseInt(req.query.limit))
                    .limit(limit)
                    .exec((err, docs) => {
                        if (!err) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });

            }
            else if (req.query.operation == 'RandomMentorData') {

                let limit = 10;
                if (req.query.limit) {
                    limit = parseInt(req.query.limit);
                }
                let conditions = {isMentoring: true};
                if(typeof req.query.pricerange != 'undefined'){
                    let priceRange =  req.query.pricerange.split('-')
                    conditions = {isMentoring : true, $and : [ { hourlyRate : {$gte: parseInt(priceRange[0])}}, { hourlyRate : {$lte: parseInt(priceRange[1])}}]}
                }

                UserModel.find(conditions, '_id name imageUrl designation skills address bio company industry services mentorRating hourlyRate')
                    .populate('skills', 'name')
                    .populate('industry', 'name')
                    .populate('services', 'name')
                    .sort({ 'name': 'asc' })
                    .skip((parseInt(req.query.page) - 1) * parseInt(req.query.limit))
                    .limit(limit)
                    .exec((err, docs) => {
                        if (!err) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });

            }
            else if (req.query.operation == 'BasicMentorData' && typeof req.query.mentor_id != 'undefined') {

                UserModel.find({_id: req.query.mentor_id}, '_id name imageUrl designation skills address bio company industry services mentorRating hourlyRate')
                    .populate('skills', 'name')
                    .populate('industry', 'name')
                    .populate('services', 'name')
                    .exec((err, docs) => {
                        if (!err) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });

            }
            else if (req.query.operation == 'DetailMentorData' && typeof req.query.mentor_id != 'undefined') {
                UserModel.find({ _id : req.query.mentor_id }, 'schedules mentoringCounts mentoringPlaces', (err, docs) => {
                    if (!err) {
                        resolve(docs);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else if (req.query.operation == 'SpecificMentorData') {

                let conditions = { isMentoring: true };

                if(typeof req.query.industries != 'undefined' && req.query.industries != ""){
                    //split industries and wrap them in an array by casting to mongo id
                    let someIndustries = req.query.industries.split(',')
                    let industryArray = someIndustries.map((eachElem) => {
                        return new ObjectId(eachElem)
                    });
                    conditions['industry'] = { $elemMatch: {$in: industryArray} };
                }
                
                

                if(typeof req.query.pricerange != 'undefined' && req.query.pricerange != ""){
                    let priceRange = req.query.pricerange.split('-')
                    conditions['$and'] =  [ {hourlyRate : {$gte: parseInt(priceRange[0])}}, {hourlyRate : {$lte: parseInt(priceRange[1])}}];
                       
                }

                console.log('conditions: ', conditions)
                UserModel.find(conditions , '_id name imageUrl designation skills bio education address company industry services mentorRating hourlyRate')
                    .populate('skills', 'name')
                    .populate('industry', 'name')
                    .populate('services', 'name')
                    .sort({ 'hourlyRate': req.query.order })
                    .limit(parseInt(req.query.limit))
                    .skip(parseInt(req.query.limit) * (parseInt(req.query.page) - 1 ))
                    .exec((err, docs) => {
                        if (err) {
                            reject(err);

                        }
                        else {
                            resolve(docs);
                        }
                    });
            }
            else {
                //catch all user get request
                UserModel.find({}, (err, docs) => {
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
module.exports = UserHandler;
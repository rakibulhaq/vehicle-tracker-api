const UserCouponModel = require('./user-coupon.model').UserCouponModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class UserCouponHandler{
    constructor(){
        this._validator = require('validator');
    }

    createUserCouponInfo(req, callback){
        let data = req.body;
        let UserCoupon = new UserCouponModel({
            user: data.user,
            coupon: data.coupon,
            status: data.status,
            availedTime: data.availedTime
        });

        return new Promise((resolve, reject)=>{
            UserCouponModel.find({name : data.name}, (err, someUserCoupon)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(UserCoupon);
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

    getUserCouponInfo(req, callback){
        let UserCouponId = req.params.id;
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
                    UserCouponModel.findById( UserCouponId, (err, UserCoupon)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!UserCoupon){
                                return new NotFoundError("UserCoupon Not found");
                            }
                            else{
                                resolve(UserCoupon);
                            }
                        }
                    });
                });
            }
        })
        .then((UserCoupon)=>{
            callback.onSuccess(UserCoupon);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateUserCoupon(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            UserCouponModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteUserCoupon(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting UserCoupon: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    UserCouponModel.findOneAndDelete(id, (err, UserCoupon)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(UserCoupon);
                        }
                    });
                });  
            }
        })
        .then((UserCoupon)=>{
            callback.onSuccess(UserCoupon);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllUserCoupon(req, callback){
        return new Promise((resolve, reject)=>{
            UserCouponModel.find({}, (err , docs)=>{
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
module.exports = UserCouponHandler;
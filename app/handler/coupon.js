const CouponModel = require(APP_MODEL_PATH + 'coupon').CouponModel;
const ValidationError = require(APP_ERROR_PATH + 'validation');
const NotFoundError = require(APP_ERROR_PATH + 'not_found');

class CouponHandler{
    constructor(){
        this._validator = require('validator');
    }

    createCouponInfo(req, callback){
        let data = req.body;
        let coupon = new CouponModel({
            name : data.name,
            discount: data.discount,
            validity: data.validity,
            isActive: data.isActive
        });

        return new Promise((resolve, reject)=>{
            CouponModel.find({name : data.name}, (err, someCoupon)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(someCoupon.length){
                        reject(new AlreadyExistsError('Coupon Already Exists'));

                    }
                    else{
                        resolve(coupon);
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

    getCouponInfo(req, callback){
        let couponId = req.params.id;
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
                    CouponModel.findById( couponId, (err, coupon)=>{
                        if(err){
                            reject(err);

                        }
                        else{
                            if(!coupon){
                                return new NotFoundError("Coupon Not found");
                            }
                            else{
                                resolve(coupon);
                            }
                        }
                    });
                });
            }
        })
        .then((coupon)=>{
            callback.onSuccess(coupon);
        })
        .catch((error)=>{
            callback.onError(error);
        });


    }
    updateCoupon(req, callback){
        let data = req.body;

        return new Promise((resolve, reject)=>{
            CouponModel.findOneAndUpdate({_id : req.params.id}, data, {new : true}, (err, saved)=>{
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
    deleteCoupon(req, callback){
        let id = req.params.id;

        req.checkParams('id', 'Invalid Id provided').isMongoId();
        req.getValidationResult()
        .then((result)=>{
            if(!result.isEmpty()){
                let errorMessages = result.array().map((elem)=>{
                    return elem.msg;
                });

                throw new Error("There has been an error during deleting Activity: " + errorMessages);

            }
            else{
                return new Promise((resolve, reject)=>{
                    CouponModel.findOneAndDelete(id, (err, coupon)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(coupon);
                        }
                    });
                });  
            }
        })
        .then((coupon)=>{
            callback.onSuccess(coupon);
        })
        .catch((error)=>{
            callback.onError(error);
        });

    }
    getAllCoupon(req, callback){
        return new Promise((resolve, reject)=>{
            CouponModel.find({}, (err , docs)=>{
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
module.exports = CouponHandler;
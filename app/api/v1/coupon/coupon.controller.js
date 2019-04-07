const BaseController = require('../base').BaseController;
const CouponHandler = require('./coupon.handler');
class CouponController extends BaseController{
    constructor(){
        super();
        this._couponHandler = new CouponHandler();
        this._passport = require('passport');

    }
    getCouponInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._couponHandler.getCouponInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._couponHandler.getAllCoupon(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._couponHandler.createCouponInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._couponHandler.updateCoupon(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._couponHandler.deleteCoupon(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    authenticate(req, res, next, callback){
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error){
                responseManager.respondWithError(res, error.status || 401 , error.message);
            }
        })(req, res, next);

    }
}

module.exports = CouponController;
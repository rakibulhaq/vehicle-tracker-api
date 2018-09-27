const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserCouponHandler = require(APP_HANDLER_PATH + 'user_coupon');
class UserCouponController extends BaseController{
    constructor(){
        super();
        this._UserCouponHandler = new UserCouponHandler();
        this._passport = require('passport');

    }
    getUserCouponInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserCouponHandler.getUserCouponInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserCouponHandler.getAllUserCoupon(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserCouponHandler.createUserCouponInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserCouponHandler.updateUserCoupon(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserCouponHandler.deleteUserCoupon(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserCouponController;
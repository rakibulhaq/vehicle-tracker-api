const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserPurchaseHandler = require(APP_HANDLER_PATH + 'user_purchase');
class UserPurchaseController extends BaseController{
    constructor(){
        super();
        this._UserPurchaseHandler = new UserPurchaseHandler();
        this._passport = require('passport');

    }
    getUserPurchaseInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPurchaseHandler.getUserPurchaseInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPurchaseHandler.getAllUserPurchase(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPurchaseHandler.createUserPurchaseInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPurchaseHandler.updateUserPurchase(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPurchaseHandler.deleteUserPurchase(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserPurchaseController;
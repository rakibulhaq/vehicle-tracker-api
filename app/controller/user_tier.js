const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserTierHandler = require(APP_HANDLER_PATH + 'user_tier');
class UserTierController extends BaseController{
    constructor(){
        super();
        this._UserTierHandler = new UserTierHandler();
        this._passport = require('passport');

    }
    getUserTierInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTierHandler.getUserTierInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTierHandler.getAllUserTier(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTierHandler.createUserTierInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTierHandler.updateUserTier(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTierHandler.deleteUserTier(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserTierController;
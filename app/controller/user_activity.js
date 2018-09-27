const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserActivityHandler = require(APP_HANDLER_PATH + 'user_activity');
class UserActivityController extends BaseController{
    constructor(){
        super();
        this._UserActivityHandler = new UserActivityHandler();
        this._passport = require('passport');

    }
    getUserActivityInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserActivityHandler.getUserActivityInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserActivityHandler.getAllUserActivity(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserActivityHandler.createUserActivityInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserActivityHandler.updateUserActivity(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserActivityHandler.deleteUserActivity(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserActivityController;
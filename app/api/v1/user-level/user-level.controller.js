const BaseController = require('../base').BaseController;
const UserLevelHandler = require('./user-level.handler');
class UserLevelController extends BaseController{
    constructor(){
        super();
        this._UserLevelHandler = new UserLevelHandler();
        this._passport = require('passport');

    }
    getUserLevelInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserLevelHandler.getUserLevelInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserLevelHandler.getAllUserLevel(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserLevelHandler.createUserLevelInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserLevelHandler.updateUserLevel(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserLevelHandler.deleteUserLevel(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserLevelController;
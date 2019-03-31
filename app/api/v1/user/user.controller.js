const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserHandler = require('./user.handler');
// const util = require('util');

class UserController extends BaseController{
    constructor(){
        super();
        this._userHandler = new UserHandler();
        this._passport = require('passport');

    }
    getUserInfo(req, res , next){
        //let responseManager = this._responseManager;
        //let that = this;
        this.authenticate(req, res, next, (token, user)=>{
            this._userHandler.getUserInfo(req, user, this._responseManager.getDefaultResponseHandler(res));
        });
    }
    create(req, res){
        let responseManager = this._responseManager;
        this._userHandler.createNewUser(req, responseManager.getDefaultResponseHandler(res));
    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._userHandler.getAllUser(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, (token, user)=>{
            this._userHandler.updateUser(req, this._responseManager.getDefaultResponseHandler(res));
        });
        
    }
    remove(req, res, next){
        this.authenticate(req, res, next, (token, user)=>{
            this._userHandler.deleteUser(req, this._responseManager.getDefaultResponseHandler(res));
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

module.exports = UserController;
const BaseController = require('../base').BaseController;
const UserPermissionHandler = require('./user-permission.handler');
class UserPermissionController extends BaseController{
    constructor(){
        super();
        this._UserPermissionHandler = new UserPermissionHandler();
        this._passport = require('passport');

    }
    getUserPermissionInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPermissionHandler.getUserPermissionInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPermissionHandler.getAllUserPermission(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPermissionHandler.createUserPermissionInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPermissionHandler.updateUserPermission(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserPermissionHandler.deleteUserPermission(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserPermissionController;
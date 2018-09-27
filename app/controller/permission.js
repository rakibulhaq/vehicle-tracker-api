const BaseController = require(APP_CONTROLLER_PATH + 'base');
const PermissionHandler = require(APP_HANDLER_PATH + 'permission');
class PermissionController extends BaseController{
    constructor(){
        super();
        this._permissionHandler = new PermissionHandler();
        this._passport = require('passport');

    }
    getPermissionInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._permissionHandler.getPermissionInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });
        
    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._permissionHandler.getAllPermission(req, this._responseManager.getDefaultResponseHandler(res));

        });
 

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._permissionHandler.createPermissionInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });
        
    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._permissionHandler.updatePermission(req, this._responseManager.getDefaultResponseHandler(res));

        });


    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._permissionHandler.deletePermission(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = PermissionController;
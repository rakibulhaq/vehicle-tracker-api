const BaseController = require(APP_CONTROLLER_PATH + 'base');
const PackageHandler = require(APP_HANDLER_PATH + 'package');
class PackageController extends BaseController{
    constructor(){
        super();
        this._packageHandler = new PackageHandler();
        this._passport = require('passport');

    }
    getPackageInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._packageHandler.getPackageInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._packageHandler.getAllPackage(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._packageHandler.createPackageInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._packageHandler.updatePackage(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._packageHandler.deletePackage(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = PackageController;
const BaseController = require('../base').BaseController;
const ComponentHandler = require('./component.handler');
class ComponentController extends BaseController{
    constructor(){
        super();
        this._ComponentHandler = new ComponentHandler();
        this._passport = require('passport');

    }
    getComponentInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._ComponentHandler.getComponentInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._ComponentHandler.getAllComponent(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._ComponentHandler.createComponentInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._ComponentHandler.updateComponent(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._ComponentHandler.deleteComponent(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = ComponentController;
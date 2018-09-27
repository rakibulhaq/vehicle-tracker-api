const BaseController = require(APP_CONTROLLER_PATH + 'base');
const IndustryHandler = require(APP_HANDLER_PATH + 'industry');
class IndustryController extends BaseController{
    constructor(){
        super();
        this._industryHandler = new IndustryHandler();
        this._passport = require('passport');

    }
    getIndustryInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industryHandler.getIndustryInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industryHandler.getAllIndustry(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industryHandler.createIndustryInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industryHandler.updateIndustry(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industryHandler.deleteIndustry(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = IndustryController;
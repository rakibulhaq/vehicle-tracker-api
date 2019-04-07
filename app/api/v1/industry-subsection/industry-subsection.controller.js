const BaseController = require('../base').BaseController;
const IndustrySubsectionHandler = require('./industry-subsection.handler');
class IndustrySubsectionController extends BaseController{
    constructor(){
        super();
        this._industrySubsectionHandler = new IndustrySubsectionHandler();
        this._passport = require('passport');

    }
    getIndustrySubsectionInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industrySubsectionHandler.getIndustrySubsectionInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industrySubsectionHandler.getAllIndustrySubsection(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industrySubsectionHandler.createIndustrySubsectionInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industrySubsectionHandler.updateIndustrySubsection(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._industrySubsectionHandler.deleteIndustrySubsection(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = IndustrySubsectionController;
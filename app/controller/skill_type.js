const BaseController = require(APP_CONTROLLER_PATH + 'base');
const SkillTypeHandler = require(APP_HANDLER_PATH + 'skill_type');
class SkillTypeController extends BaseController{
    constructor(){
        super();
        this._skillTypeHandler = new SkillTypeHandler();
        this._passport = require('passport');

    }
    getSkillTypeInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillTypeHandler.getSkillTypeInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillTypeHandler.getAllSkillType(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillTypeHandler.createSkillTypeInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillTypeHandler.updateSkillType(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillTypeHandler.deleteSkillType(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = SkillTypeController;
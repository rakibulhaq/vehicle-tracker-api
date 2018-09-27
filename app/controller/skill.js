const BaseController = require(APP_CONTROLLER_PATH + 'base');
const SkillHandler = require(APP_HANDLER_PATH + 'skill');
class SkillController extends BaseController{
    constructor(){
        super();
        this._skillHandler = new SkillHandler();
        this._passport = require('passport');

    }
    getSkillInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillHandler.getSkillInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillHandler.getAllSkill(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillHandler.createSkillInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillHandler.updateSkill(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._skillHandler.deleteSkill(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = SkillController;
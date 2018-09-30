const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserSkillHandler = require(APP_HANDLER_PATH + 'user_skill');
class UserSkillController extends BaseController{
    constructor(){
        super();
        this._UserSkillHandler = new UserSkillHandler();
        this._passport = require('passport');

    }
    getUserSkillInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserSkillHandler.getUserSkillInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserSkillHandler.getAllUserSkill(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserSkillHandler.createUserSkillInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserSkillHandler.updateUserSkill(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserSkillHandler.deleteUserSkill(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserSkillController;
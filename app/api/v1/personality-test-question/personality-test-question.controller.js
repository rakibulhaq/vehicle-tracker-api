const BaseController = require('../base').BaseController;
const PersonalityTestQuestionHandler = require('./personality-test-question.handler');
class PersonalityTestQuestionController extends BaseController{
    constructor(){
        super();
        this._PersonalityTestQuestionHandler = new PersonalityTestQuestionHandler();
        this._passport = require('passport');

    }
    getPersonalityTestQuestionInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestQuestionHandler.getPersonalityTestQuestionInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestQuestionHandler.getAllPersonalityTestQuestion(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestQuestionHandler.createPersonalityTestQuestionInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestQuestionHandler.updatePersonalityTestQuestion(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestQuestionHandler.deletePersonalityTestQuestion(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }

    authenticate(req, res, next, callback){
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error){
                responseManager.respondWithError(res, error.status || 401 , error.PersonalityTestQuestion);
            }
        })(req, res, next);

    }
}

module.exports = PersonalityTestQuestionController;
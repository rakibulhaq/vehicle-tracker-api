const BaseController = require('../base').BaseController;
const PersonalityTestResultHandler = require('./personality-test-result.handler');
class PersonalityTestResultController extends BaseController{
    constructor(){
        super();
        this._PersonalityTestResultHandler = new PersonalityTestResultHandler();
        this._passport = require('passport');

    }
    getPersonalityTestResultInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestResultHandler.getPersonalityTestResultInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestResultHandler.getAllPersonalityTestResult(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestResultHandler.createPersonalityTestResultInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestResultHandler.updatePersonalityTestResult(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestResultHandler.deletePersonalityTestResult(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }

    authenticate(req, res, next, callback){
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error){
                responseManager.respondWithError(res, error.status || 401 , error.PersonalityTestResult);
            }
        })(req, res, next);

    }
}

module.exports = PersonalityTestResultController;
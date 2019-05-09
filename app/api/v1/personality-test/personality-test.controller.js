const BaseController = require('../base').BaseController;
const PersonalityTestHandler = require('./personality-test.handler');
class PersonalityTestController extends BaseController{
    constructor(){
        super();
        this._PersonalityTestHandler = new PersonalityTestHandler();
        this._passport = require('passport');

    }
    getPersonalityTestInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestHandler.getPersonalityTestInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestHandler.getAllPersonalityTest(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestHandler.createPersonalityTestInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestHandler.updatePersonalityTest(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._PersonalityTestHandler.deletePersonalityTest(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }

    authenticate(req, res, next, callback){
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error){
                responseManager.respondWithError(res, error.status || 401 , error.PersonalityTest);
            }
        })(req, res, next);

    }
}

module.exports = PersonalityTestController;
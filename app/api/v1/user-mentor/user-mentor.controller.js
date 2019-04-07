const BaseController = require('../base').BaseController;
const UserMentorHandler = require('./user-mentor.handler');
class UserMentorController extends BaseController{
    constructor(){
        super();
        this._UserMentorHandler = new UserMentorHandler();
        this._passport = require('passport');

    }
    getUserMentorInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserMentorHandler.getUserMentorInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserMentorHandler.getAllUserMentor(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserMentorHandler.createUserMentorInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserMentorHandler.updateUserMentor(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserMentorHandler.deleteUserMentor(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserMentorController;
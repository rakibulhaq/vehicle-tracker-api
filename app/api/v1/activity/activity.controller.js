const BaseController = require('../base').BaseController;
const ActivityHandler = require('./activity.handler');
class ActivityController extends BaseController{
    constructor(){
        super();
        this._activityHandler = new ActivityHandler();
        this._passport = require('passport');

    }
    getActivityInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._activityHandler.getActivityInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });
        
    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._activityHandler.getAllActivity(req, this._responseManager.getDefaultResponseHandler(res));

        });
 

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._activityHandler.createActivityInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });
        
    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._activityHandler.updateActivity(req, this._responseManager.getDefaultResponseHandler(res));

        });


    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._activityHandler.deleteActivity(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = ActivityController;
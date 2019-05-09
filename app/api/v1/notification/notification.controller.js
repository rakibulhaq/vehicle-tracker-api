const BaseController = require('../base').BaseController;
const NotificationHandler = require('./notification.handler');
class NotificationController extends BaseController{
    constructor(){
        super();
        this._NotificationHandler = new NotificationHandler();
        this._passport = require('passport');

    }
    getNotificationInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._NotificationHandler.getNotificationInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._NotificationHandler.getAllNotification(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._NotificationHandler.createNotificationInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._NotificationHandler.updateNotification(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._NotificationHandler.deleteNotification(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }

    authenticate(req, res, next, callback){
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: callback,
            onFailure: function(error){
                responseManager.respondWithError(res, error.status || 401 , error.Notification);
            }
        })(req, res, next);

    }
}

module.exports = NotificationController;
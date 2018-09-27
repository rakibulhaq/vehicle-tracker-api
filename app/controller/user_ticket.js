const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserTicketHandler = require(APP_HANDLER_PATH + 'user_ticket');
class UserTicketController extends BaseController{
    constructor(){
        super();
        this._UserTicketHandler = new UserTicketHandler();
        this._passport = require('passport');

    }
    getUserTicketInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTicketHandler.getUserTicketInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTicketHandler.getAllUserTicket(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTicketHandler.createUserTicketInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTicketHandler.updateUserTicket(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._UserTicketHandler.deleteUserTicket(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = UserTicketController;
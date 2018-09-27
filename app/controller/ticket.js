const BaseController = require(APP_CONTROLLER_PATH + 'base');
const TicketHandler = require(APP_HANDLER_PATH + 'ticket');
class TicketController extends BaseController{
    constructor(){
        super();
        this._TicketHandler = new TicketHandler();
        this._passport = require('passport');

    }
    getTicketInfo(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._TicketHandler.getTicketInfo(req, this._responseManager.getDefaultResponseHandler(res));
        });

    }
    getAll(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._TicketHandler.getAllTicket(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    create(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._TicketHandler.createTicketInfo(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    update(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._TicketHandler.updateTicket(req, this._responseManager.getDefaultResponseHandler(res));

        });

    }
    remove(req, res, next){
        this.authenticate(req, res, next, ()=>{
            this._TicketHandler.deleteTicket(req, this._responseManager.getDefaultResponseHandler(res));

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

module.exports = TicketController;
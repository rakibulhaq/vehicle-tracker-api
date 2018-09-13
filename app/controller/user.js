const BaseController = require(APP_CONTROLLER_PATH + 'base');
const UserHandler = require(APP_HANDLER_PATH + 'user');
const util = require('util');

class UserController extends BaseController{
    constructor(){
        super();
        this._userHandler = new UserHandler();

    }
    get(req, res){
        this._userHandler.getUserInfo(req, this._responseManager.getDefaultResponseHandler(res));

    }
    create(req, res){
        this._userHandler.createNewUser(req, this._responseManager.getDefaultResponseHandler(res));

    }
    getAll(req, res){

    }
    update(req, res){

    }
    remove(req, res){

    }
    authenticate(req, res, callback){

    }

}

module.exports = UserController;
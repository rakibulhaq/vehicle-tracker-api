const ResponseManager = require(APP_MANAGER_PATH + 'response');
const BaseAutoBindClass = require(APP_BASE_PACKAGE_PATH + 'base_autobind');

class BaseController extends BaseAutoBindClass{
    constructor(){
        super();
        if(new.target == BaseController){
            throw new TypeError('Cannot construct base controller class directly');
        }
        this._responseManager = ResponseManager;
    }
    get(req, res){

    }
    getAll(req, res){

    }
    create(req, res){

    }
    update(req, res){

    }
    remove(req, res){

    }
    authenticate(req, res, callback){

    }
}

module.exports = BaseController;
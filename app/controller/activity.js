const BaseController = require(APP_CONTROLLER_PATH + 'base');
const ActivityHandler = require(APP_HANDLER_PATH + 'activity');
class ActivityController extends BaseController{
    constructor(){
        super();
        this._activityHandler = new ActivityHandler();

    }
    getActivityInfo(req, res){
        this._activityHandler.getActivityInfo(req, this._responseManager.getDefaultResponseHandler(res));
    }
    getAll(req, res){
        this._activityHandler.getAllActivity(req, this._responseManager.getDefaultResponseHandler(res));

    }
    create(req, res){
        this._activityHandler.createActivityInfo(req, this._responseManager.getDefaultResponseHandler(res));
    }
    update(req, res){
        this._activityHandler.updateActivity(req, this._responseManager.getDefaultResponseHandler(res));

    }
    remove(req, res){
        this._activityHandler.deleteActivity(req, this._responseManager.getDefaultResponseHandler(res));
    }
}

module.exports = ActivityController;
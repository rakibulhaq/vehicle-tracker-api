const BaseController = require('../base').BaseController;
const VehiclePositionHandler = require('./vehicle-position.handler');

class VehiclePositionController extends BaseController{
    constructor(){
        super();
        this._VehiclePositionHandler = new VehiclePositionHandler();

    }
    getVehiclePositionInfo(req, res , next){
        this._VehiclePositionHandler.getVehiclePositionInfo(req, VehiclePosition, this._responseManager.getDefaultResponseHandler(res));
    }
    create(req, res){
        let responseManager = this._responseManager;
        this._VehiclePositionHandler.createNewVehiclePosition(req, responseManager.getDefaultResponseHandler(res));
    }
    getAll(req, res, next){
            this._VehiclePositionHandler.getAllVehiclePosition(req, this._responseManager.getDefaultResponseHandler(res));
    }
    update(req, res, next){
            this._VehiclePositionHandler.updateVehiclePosition(req, this._responseManager.getDefaultResponseHandler(res));
    }
    remove(req, res, next){
            this._VehiclePositionHandler.deleteVehiclePosition(req, this._responseManager.getDefaultResponseHandler(res));
    }

}

module.exports = VehiclePositionController;
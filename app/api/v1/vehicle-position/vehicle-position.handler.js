const VehiclePositionModel = require('./vehicle-position.model').VehiclePosition;

class VehiclePositionHandler {
    constructor() {
        this._validator = require('validator');
    }

    getVehiclePositionInfo(req, VehiclePositionToken, callback) {

        return new Promise(function (resolve, reject) {
            //Fetch a Specific Vehicle Info Against its vehicle_id
            let data = req.body;
            
            VehiclePositionHandler

        })
            .then((VehiclePosition) => {
                callback.onSuccess(VehiclePosition);
            })
            .catch((error) => {
                callback.onError(error);
            });
    }
    createNewVehiclePosition(req, callback) {
        let data = req.body;


        return new VehiclePositionModel({

            name: data.name,
            email: email == '' ? data.email : email,
            phone: phoneNo == '' ? data.phone : phoneNo,
            age: data.age,
            imageUrl: data.imageUrl,
        })
            .then((VehiclePosition) => {
                return new Promise(function (resolve, reject) {
                    //create vehicle position entry
                });

            })
            .then((VehiclePosition) => {
                VehiclePosition.save();
                return VehiclePosition;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    updateVehiclePosition(req, callback) {
        let data = req.body;

        return new Promise((resolve, reject) => {
            //update endpoint

        })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    deleteVehiclePosition(req, callback) {


        return new Promise((resolve, reject) => {
            //delete endpoint for vehicle position entry
        })
            .then((VehiclePosition) => {
                //remove or delete

                return VehiclePosition;
            })
            .then((saved) => {
                callback.onSuccess(saved);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
    getAllVehiclePosition(req, callback) {
        return new Promise((resolve, reject) => {
            if (typeof req.query.operation != 'undefined' && req.query.operation == 'NearByInfo') {
                

            }
            else {
                //catch all VehiclePosition get request
                
            }

        })
            .then((data) => {
                callback.onSuccess(data);
            })
            .catch((error) => {
                callback.onError(error);
            });

    }
}
module.exports = VehiclePositionHandler;
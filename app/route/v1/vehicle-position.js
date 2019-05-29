const router = require('express').Router();

const VehiclePositionController = require('../../api/v1/vehicle-position').VehiclePositionController;

let vehiclePositionController = new VehiclePositionController();

router.get('/', vehiclePositionController.getAll);
router.get('/:id', vehiclePositionController.getVehiclePositionInfo);
router.post('/', vehiclePositionController.create);
router.delete('/:id', vehiclePositionController.remove);
router.put('/:id', vehiclePositionController.update);

module.exports = router;
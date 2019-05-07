const router = require('express').Router();
const ServiceController = require('../../api/v1/service').ServiceController;

let serviceController = new ServiceController();

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getServiceInfo);
router.post('/', serviceController.create);
router.delete('/:id', serviceController.remove);
router.put('/:id', serviceController.update);

module.exports = router;
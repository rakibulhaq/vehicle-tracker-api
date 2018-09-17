const router = require('express').Router();
const PackageController = require(APP_CONTROLLER_PATH + 'package');

let packageController = new PackageController();

router.get('/', packageController.get);
router.get('/:id', packageController.getPackageInfo);
router.post('/', packageController.create);
router.delete('/:id', packageController.remove);
router.put('/:id', packageController.update);

module.exports = router;
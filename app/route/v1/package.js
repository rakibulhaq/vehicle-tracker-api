const router = require('express').Router;
const PackageController = require(APP_CONTROLLER_PATH + 'package');

let packageController = new PackageController();

router.get('/', packageController.get);
router.get('/:id', packageController.getPackageInfo);
router.post('/:id', packageController.post);
router.delete('/:id', packageController.del);
router.put('/:id', packageController.put);

module.exports = router;
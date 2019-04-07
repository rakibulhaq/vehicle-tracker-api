const router = require('express').Router();
const PackageController = require('../../api/v1/package').PackageController;

let packageController = new PackageController();

router.get('/', packageController.getAll);
router.get('/:id', packageController.getPackageInfo);
router.post('/', packageController.create);
router.delete('/:id', packageController.remove);
router.put('/:id', packageController.update);

module.exports = router;
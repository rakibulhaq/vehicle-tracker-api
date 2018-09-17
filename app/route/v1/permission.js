const router = require('express').Router();
const PermissionController = require(APP_CONTROLLER_PATH + 'permission');

let permissionController = new PermissionController();

router.get('/', permissionController.get);
router.get('/:id', permissionController.getPermissionInfo);
router.post('/', permissionController.create);
router.delete('/:id', permissionController.remove);
router.put('/:id', permissionController.update);

module.exports = router;
const router = require('express').Router;
const PermissionController = require(APP_CONTROLLER_PATH + 'permission');

let permissionController = new PermissionController();

router.get('/', permissionController.get);
router.get('/:id', permissionController.getPermissionInfo);
router.post('/:id', permissionController.post);
router.delete('/:id', permissionController.del);
router.put('/:id', permissionController.put);

module.exports = router;
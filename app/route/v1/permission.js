const router = require('express').Router();
const PermissionController = require('../../api/v1/permission').PermissionController;

let permissionController = new PermissionController();

router.get('/', permissionController.getAll);
router.get('/:id', permissionController.getPermissionInfo);
router.post('/', permissionController.create);
router.delete('/:id', permissionController.remove);
router.put('/:id', permissionController.update);

module.exports = router;
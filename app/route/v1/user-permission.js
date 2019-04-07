const router = require('express').Router();
const UserPermissionController = require('../../api/v1/user-permission').UserPermissionController;

let userPermissionController = new UserPermissionController();

router.get('/', userPermissionController.getAll);
router.get('/:id', userPermissionController.getUserPermissionInfo);
router.post('/', userPermissionController.create);
router.delete('/:id',userPermissionController.remove);
router.put('/:id', userPermissionController.update);

module.exports = router;
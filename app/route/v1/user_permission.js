const router = require('express').Router();
const UserPermissionController = require(APP_CONTROLLER_PATH + 'user_permission');

let userPermissionController = new UserPermissionController();

router.get('/', userPermissionController.getAll);
router.get('/:id', userPermissionController.getUserPermissionInfo);
router.post('/', userPermissionController.create);
router.delete('/:id',userPermissionController.remove);
router.put('/:id', userPermissionController.update);

module.exports = router;
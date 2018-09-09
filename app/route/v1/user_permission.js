const router = require('express').Router;
const UserPermissionController = require(APP_CONTROLLER_PATH + 'user_permission');

let userPermissionController = new UserPermissionController();

router.get('/', userPermissionController.get);
router.get('/:id', userPermissionController.getUserPermissionInfo);
router.post('/:id', userPermissionController.post);
router.delete('/:id',userPermissionController.del);
router.put('/:id', userPermissionController.put);

module.exports = router;
const router = require('express').Router;

const UserController = require(APP_CONTROLLER_PATH + 'user');

let userController = new UserController();

router.get('/', userController.get);
router.get('/:id', userController.getUserInfo);
router.post('/', userController.post);
router.delete('/:id', userController.del);
router.put('/:id', userController.put);

module.exports = router;
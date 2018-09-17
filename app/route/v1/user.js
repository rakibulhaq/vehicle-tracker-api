const router = require('express').Router();

const UserController = require(APP_CONTROLLER_PATH + 'user');

let userController = new UserController();

router.get('/', userController.getAll);
router.get('/:id', userController.getUserInfo);
router.post('/', userController.create);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);

module.exports = router;
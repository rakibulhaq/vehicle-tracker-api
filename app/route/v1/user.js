const router = require('express').Router();

const UserController = require('../../api/v1/user').UserController;

let userController = new UserController();

router.get('/', userController.getAll);
router.get('/:id', userController.getUserInfo);
router.post('/', userController.create);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);

module.exports = router;
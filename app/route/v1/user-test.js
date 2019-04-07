const router = require('express').Router();
const UserTestController = require('../../api/v1/user-test').UserTestController;

let userTestController = new UserTestController();

router.get('/', userTestController.getAll);
router.get('/:id', userTestController.getUserTestInfo);
router.post('/', userTestController.create);
router.delete('/:id',userTestController.remove);
router.put('/:id', userTestController.update);

module.exports = router;
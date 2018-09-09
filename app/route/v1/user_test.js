const router = require('express').Router;
const UserTestController = require(APP_CONTROLLER_PATH + 'user_test');

let userTestController = new UserTestController();

router.get('/', userTestController.get);
router.get('/:id', userTestController.getUserTestInfo);
router.post('/:id', userTestController.post);
router.delete('/:id',userTestController.del);
router.put('/:id', userTestController.put);

module.exports = router;
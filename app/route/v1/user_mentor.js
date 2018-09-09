const router = require('express').Router;
const UserMentorController = require(APP_CONTROLLER_PATH + 'user_mentor');

let userMentorController = new UserMentorController();

router.get('/', userMentorController.get);
router.get('/:id', userMentorController.getUserMentorInfo);
router.post('/:id', userMentorController.post);
router.delete('/:id',userMentorController.del);
router.put('/:id', userMentorController.put);

module.exports = router;
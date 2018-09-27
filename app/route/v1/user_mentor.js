const router = require('express').Router();
const UserMentorController = require(APP_CONTROLLER_PATH + 'user_mentor');

let userMentorController = new UserMentorController();

router.get('/', userMentorController.getAll);
router.get('/:id', userMentorController.getUserMentorInfo);
router.post('/', userMentorController.create);
router.delete('/:id',userMentorController.remove);
router.put('/:id', userMentorController.update);

module.exports = router;
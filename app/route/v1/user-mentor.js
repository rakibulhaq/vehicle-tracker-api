const router = require('express').Router();
const UserMentorController = require('../../api/v1/user-mentor').UserMentorController;

let userMentorController = new UserMentorController();

router.get('/', userMentorController.getAll);
router.get('/:id', userMentorController.getUserMentorInfo);
router.post('/', userMentorController.create);
router.delete('/:id',userMentorController.remove);
router.put('/:id', userMentorController.update);

module.exports = router;
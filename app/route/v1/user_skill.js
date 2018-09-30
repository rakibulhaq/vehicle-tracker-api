const router = require('express').Router();
const UserSkillController = require(APP_CONTROLLER_PATH + 'user_skill');

let userSkillController = new UserSkillController();

router.get('/', userSkillController.getAll);
router.get('/:id', userSkillController.getUserSkillInfo);
router.post('/', userSkillController.create);
router.delete('/:id',userSkillController.remove);
router.put('/:id', userSkillController.update);

module.exports = router;
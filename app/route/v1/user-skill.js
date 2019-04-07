const router = require('express').Router();
const UserSkillController = require('../../api/v1/user-skill').UserSkillController;

let userSkillController = new UserSkillController();

router.get('/', userSkillController.getAll);
router.get('/:id', userSkillController.getUserSkillInfo);
router.post('/', userSkillController.create);
router.delete('/:id',userSkillController.remove);
router.put('/:id', userSkillController.update);

module.exports = router;
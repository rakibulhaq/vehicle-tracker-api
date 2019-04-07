const router = require('express').Router();
const SkillController = require('../../api/v1/skill').SkillController;

let skillController = new SkillController();

router.get('/', skillController.getAll);
router.get('/:id', skillController.getSkillInfo);
router.post('/', skillController.create);
router.delete('/:id', skillController.remove);
router.put('/:id', skillController.update);

module.exports = router;
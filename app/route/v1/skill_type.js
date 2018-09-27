const router = require('express').Router();
const SkillTypeController = require(APP_CONTROLLER_PATH + 'skill_type');

let skillTypeController = new SkillTypeController();

router.get('/', skillTypeController.getAll);
router.get('/:id', skillTypeController.getSkillTypeInfo);
router.post('/', skillTypeController.create);
router.delete('/:id', skillTypeController.remove);
router.put('/:id', skillTypeController.update);

module.exports = router;
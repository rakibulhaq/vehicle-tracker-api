const router = require('express').Router();
const SkillController = require(APP_CONTROLLER_PATH + 'skill');

let skillController = new SkillController();

router.get('/', skillController.get);
router.get('/:id', skillController.getSkillInfo);
router.post('/', skillController.create);
router.delete('/:id', skillController.remove);
router.put('/:id', skillController.update);

module.exports = router;
const router = require('express').Router;
const SkillController = require(APP_CONTROLLER_PATH + 'skill');

let skillController = new SkillController();

router.get('/', skillController.get);
router.get('/:id', skillController.getSkillInfo);
router.post('/:id', skillController.post);
router.delete('/:id', skillController.del);
router.put('/:id', skillController.put);

module.exports = router;
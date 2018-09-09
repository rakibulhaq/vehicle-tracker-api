const router = require('express').Router;
const SkillTypeController = require(APP_CONTROLLER_PATH + 'skill_type');

let skillTypeController = new SkillTypeController();

router.get('/', skillTypeController.get);
router.get('/:id', skillTypeController.getSkillTypeInfo);
router.post('/:id', activityController.post);
router.delete('/:id', skillTypeController.del);
router.put('/:id', skillTypeController.put);

module.exports = router;
const router = require('express').Router();
const SkillTestController = require('../../api/v1/skill-test').SkillTestController;

let testController = new SkillTestController();

router.get('/', testController.getAll);
router.get('/:id', testController.getTestInfo);
router.post('/', testController.create);
router.delete('/:id', testController.remove);
router.put('/:id', testController.update);

module.exports = router;
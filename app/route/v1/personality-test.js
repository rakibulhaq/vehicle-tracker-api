const router = require('express').Router();
const PersonalityTestController = require('../../api/v1/personality-test').PersonalityTestController;

let personalityTestController = new PersonalityTestController();

router.get('/', personalityTestController.getAll);
router.get('/:id', personalityTestController.getPersonalityTestInfo);
router.post('/', personalityTestController.create);
router.delete('/:id', personalityTestController.remove);
router.put('/:id', personalityTestController.update);

module.exports = router;
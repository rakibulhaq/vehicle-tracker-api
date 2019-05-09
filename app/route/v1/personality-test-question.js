const router = require('express').Router();
const PersonalityTestQuestionController = require('../../api/v1/personality-test-question').PersonalityTestQuestionController;

let personalityTestQuestionController = new PersonalityTestQuestionController();

router.get('/', personalityTestQuestionController.getAll);
router.get('/:id', personalityTestQuestionController.getPersonalityTestQuestionInfo);
router.post('/', personalityTestQuestionController.create);
router.delete('/:id', personalityTestQuestionController.remove);
router.put('/:id', personalityTestQuestionController.update);

module.exports = router;
const router = require('express').Router();
const PersonalityTestResultController = require('../../api/v1/personality-test-result').PersonalityTestResultController;

let personalityTestResultController = new PersonalityTestResultController();

router.get('/', personalityTestResultController.getAll);
router.get('/:id', personalityTestResultController.getPersonalityTestResultInfo);
router.post('/', personalityTestResultController.create);
router.delete('/:id', personalityTestResultController.remove);
router.put('/:id', personalityTestResultController.update);

module.exports = router;
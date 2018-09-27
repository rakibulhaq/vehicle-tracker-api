const router = require('express').Router();
const TestController = require(APP_CONTROLLER_PATH + 'test');

let testController = new TestController();

router.get('/', testController.getAll);
router.get('/:id', testController.getTestInfo);
router.post('/', testController.create);
router.delete('/:id', testController.remove);
router.put('/:id', testController.update);

module.exports = router;
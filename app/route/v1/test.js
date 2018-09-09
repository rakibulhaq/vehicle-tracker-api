const router = require('express').Router;
const TestController = require(APP_CONTROLLER_PATH + 'test');

let testController = new TestController();

router.get('/', testController.get);
router.get('/:id', testController.getTestInfo);
router.post('/:id', testController.post);
router.delete('/:id', testController.del);
router.put('/:id', testController.put);

module.exports = router;
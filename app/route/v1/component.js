const router = require('express').Router;
const ComponentController = require(APP_CONTROLLER_PATH + 'component');
let componentController = new ComponentController();

router.get('/', componentController.get);
router.get('/:id', componentController.get);
router.delete('/:id', componentController.del);
router.post('/:id', componentController.post);
router.put('/:id', componentController.put);

module.exports = router;
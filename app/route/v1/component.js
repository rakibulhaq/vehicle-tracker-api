const router = require('express').Router();
const ComponentController = require(APP_CONTROLLER_PATH + 'component');
let componentController = new ComponentController();

router.get('/', componentController.getAll);
router.get('/:id', componentController.getComponentInfo);
router.delete('/:id', componentController.remove);
router.post('/', componentController.create);
router.put('/:id', componentController.update);

module.exports = router;
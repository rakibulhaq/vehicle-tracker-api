const router = require('express').Router();
const UserLevelController = require(APP_CONTROLLER_PATH + 'user_level');

let userLevelController = new UserLevelController();

router.get('/', userLevelController.get);
router.get('/:id', userLevelController.getUserLevelInfo);
router.post('/', userLevelController.create);
router.delete('/:id',userLevelController.remove);
router.put('/:id', userLevelController.update);

module.exports = router;
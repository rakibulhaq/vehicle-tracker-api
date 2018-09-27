const router = require('express').Router();
const UserActivityController = require(APP_CONTROLLER_PATH + 'user_activity');

let userActivityController = new UserActivityController();

router.get('/', userActivityController.getAll);
router.get('/:id', userActivityController.getUserActivityInfo);
router.post('/', userActivityController.create);
router.delete('/:id', userActivityController.remove);
router.put('/:id', userActivityController.update);

module.exports = router;
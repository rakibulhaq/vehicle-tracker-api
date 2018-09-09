const router = require('express').Router;
const UserActivityController = require(APP_CONTROLLER_PATH + 'user_activity');

let userActivityController = new UserActivityController();

router.get('/', userActivityController.get);
router.get('/:id', userActivityController.getUserActivityInfo);
router.post('/:id', userActivityController.post);
router.delete('/:id', userActivityController.del);
router.put('/:id', userActivityController.put);

module.exports = router;
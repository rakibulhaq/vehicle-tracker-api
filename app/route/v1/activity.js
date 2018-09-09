const router = require('express').Router;
const ActivityController = require(APP_CONTROLLER_PATH + 'activity');

let activityController = new ActivityController();

router.get('/', activityController.get);
router.get('/:id', activityController.getActivityInfo);
router.post('/:id', activityController.post);
router.delete('/:id', activityController.del);
router.put('/:id', activityController.put);

module.exports = router;
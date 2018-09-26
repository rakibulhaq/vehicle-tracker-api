const router = require('express').Router();
const ActivityController = require(APP_CONTROLLER_PATH + 'activity');

let activityController = new ActivityController();

router.get('/', activityController.getAll);
router.get('/:id', activityController.getActivityInfo);
router.post('/', activityController.create);
router.delete('/:id', activityController.remove);
router.put('/:id', activityController.update);

module.exports = router;
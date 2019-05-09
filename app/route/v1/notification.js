const router = require('express').Router();
const NotificationController = require('../../api/v1/notification').NotificationController;

let notificationController = new NotificationController();

router.get('/', notificationController.getAll);
router.get('/:id', notificationController.getNotificationInfo);
router.post('/', notificationController.create);
router.delete('/:id', notificationController.remove);
router.put('/:id', notificationController.update);

module.exports = router;
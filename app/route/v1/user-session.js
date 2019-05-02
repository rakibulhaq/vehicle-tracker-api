const router = require('express').Router();
const UserSessionController = require('../../api/v1/user-session').UserSessionController;

let userSessionController = new UserSessionController();

router.get('/', userSessionController.getAll);
router.get('/:id', userSessionController.getUserSessionInfo);
router.post('/', userSessionController.create);
router.delete('/:id', userSessionController.remove);
router.put('/:id', userSessionController.update);

module.exports = router;
const router = require('express').Router();
const userSessionController = require('../../api/v1/user-session').UserSessionController;

let userSessionController = new userSessionController();

router.get('/', userSessionController.getAll);
router.get('/:id', userSessionController.getUserSessionInfo);
router.post('/', userSessionController.create);
router.delete('/:id', userSessionController.remove);
router.put('/:id', userSessionController.update);

module.exports = router;
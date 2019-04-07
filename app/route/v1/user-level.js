const router = require('express').Router();
const UserLevelController = require('../../api/v1/user-level').UserLevelController;

let userLevelController = new UserLevelController();

router.get('/', userLevelController.getAll);
router.get('/:id', userLevelController.getUserLevelInfo);
router.post('/', userLevelController.create);
router.delete('/:id',userLevelController.remove);
router.put('/:id', userLevelController.update);

module.exports = router;
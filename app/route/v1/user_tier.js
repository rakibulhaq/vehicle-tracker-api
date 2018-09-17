const router = require('express').Router();
const UserTierController = require(APP_CONTROLLER_PATH + 'user_Tier');

let userTierController = new UserTierController();

router.get('/', userTierController.getAll);
router.get('/:id', userTierController.getUserTierInfo);
router.post('/', userTierController.create);
router.delete('/:id',userTierController.remove);
router.put('/:id', userTierController.update);

module.exports = router;
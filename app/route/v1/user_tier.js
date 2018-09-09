const router = require('express').Router;
const UserTierController = require(APP_CONTROLLER_PATH + 'user_Tier');

let userTierController = new UserTierController();

router.get('/', userTierController.get);
router.get('/:id', userTierController.getUserTierInfo);
router.post('/:id', userTierController.post);
router.delete('/:id',userTierController.del);
router.put('/:id', userTierController.put);

module.exports = router;
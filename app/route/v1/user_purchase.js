const router = require('express').Router;
const UserPurchaseController = require(APP_CONTROLLER_PATH + 'user_purchase');

let userPurchaseController = new UserPurchaseController();

router.get('/', userPurchaseController.get);
router.get('/:id', userPurchaseController.getUserPurchaseInfo);
router.post('/:id', userPurchaseController.post);
router.delete('/:id',userPurchaseController.del);
router.put('/:id', userPurchaseController.put);

module.exports = router;
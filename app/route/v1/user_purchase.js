const router = require('express').Router();
const UserPurchaseController = require(APP_CONTROLLER_PATH + 'user_purchase');

let userPurchaseController = new UserPurchaseController();

router.get('/', userPurchaseController.getAll);
router.get('/:id', userPurchaseController.getUserPurchaseInfo);
router.post('/', userPurchaseController.create);
router.delete('/:id',userPurchaseController.remove);
router.put('/:id', userPurchaseController.update);

module.exports = router;
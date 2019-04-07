const router = require('express').Router();
const UserPurchaseController = require('../../api/v1/user-purchase').UserPurchaseController;

let userPurchaseController = new UserPurchaseController();

router.get('/', userPurchaseController.getAll);
router.get('/:id', userPurchaseController.getUserPurchaseInfo);
router.post('/', userPurchaseController.create);
router.delete('/:id',userPurchaseController.remove);
router.put('/:id', userPurchaseController.update);

module.exports = router;
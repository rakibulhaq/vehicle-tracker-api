const router = require('express').Router();
const UserCouponController = require(APP_CONTROLLER_PATH + 'user_coupon');

let userCouponController = new UserCouponController();

router.get('/', userCouponController.get);
router.get('/:id', userCouponController.getUserCouponInfo);
router.post('/', userCouponController.create);
router.delete('/:id',userCouponController.remove);
router.put('/:id', userCouponController.update);

module.exports = router;
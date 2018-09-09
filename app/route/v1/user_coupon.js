const router = require('express').Router;
const UserCouponController = require(APP_CONTROLLER_PATH + 'user_coupon');

let userCouponController = new UserCouponController();

router.get('/', userCouponController.get);
router.get('/:id', userCouponController.getUserCouponInfo);
router.post('/:id', userCouponController.post);
router.delete('/:id',userCouponController.del);
router.put('/:id', userCouponController.put);

module.exports = router;
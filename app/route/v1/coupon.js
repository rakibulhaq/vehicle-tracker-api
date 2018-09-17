const router = require('express').Router();
const CouponController = require(APP_CONTROLLER_PATH + 'coupon');
let couponController = new CouponController();

router.get('/', couponController.get);
router.get('/:id', couponController.getCouponInfo);
router.delete('/:id', couponController.remove);
router.put('/:id',couponController.update);
router.post('/', couponController.create);

module.exports = router;
const router = require('express').Router;
const CouponController = require(AAP_CONTROLLER_PATH + 'coupon');
let couponController = new CouponController();

router.get('/', couponController.get);
router.get('/:id', couponController.get);
router.delete('/:id', couponController.del);
router.put('/:id',couponController.put);
router.post('/:id', couponController.post);

module.exports = router;
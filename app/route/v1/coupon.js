const router = require('express').Router();
const CouponController = require('../../api/v1/coupon').CouponController;
let couponController = new CouponController();

router.get('/', couponController.getAll);
router.get('/:id', couponController.getCouponInfo);
router.delete('/:id', couponController.remove);
router.put('/:id',couponController.update);
router.post('/', couponController.create);

module.exports = router;
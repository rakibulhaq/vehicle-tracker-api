const router = require('express').Router();
const UserCouponController = require('../../api/v1/user-coupon').UserCouponController;

let userCouponController = new UserCouponController();

router.get('/', userCouponController.getAll);
router.get('/:id', userCouponController.getUserCouponInfo);
router.post('/', userCouponController.create);
router.delete('/:id',userCouponController.remove);
router.put('/:id', userCouponController.update);

module.exports = router;
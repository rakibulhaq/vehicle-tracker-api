const router = require('express').Router();
const UserTierController = require('../../api/v1/user-tier').UserTierController;

let userTierController = new UserTierController();

router.get('/', userTierController.getAll);
router.get('/:id', userTierController.getUserTierInfo);
router.post('/', userTierController.create);
router.delete('/:id',userTierController.remove);
router.put('/:id', userTierController.update);

module.exports = router;
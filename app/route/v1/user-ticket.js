const router = require('express').Router();
const UserTicketController = require('../../api/v1/user-ticket').UserTicketController;

let userTicketController = new UserTicketController();

router.get('/', userTicketController.getAll);
router.get('/:id', userTicketController.getUserTicketInfo);
router.post('/', userTicketController.create);
router.delete('/:id',userTicketController.remove);
router.put('/:id', userTicketController.update);

module.exports = router;
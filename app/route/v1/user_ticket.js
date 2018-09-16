const router = require('express').Router;
const UserTicketController = require(APP_CONTROLLER_PATH + 'user_ticket');

let userTicketController = new UserTicketController();

router.get('/', userTicketController.getAll);
router.get('/:id', userTicketController.getUserTicketInfo);
router.post('/:id', userTicketController.create);
router.delete('/:id',userTicketController.remove);
router.put('/:id', userTicketController.update);

module.exports = router;
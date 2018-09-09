const router = require('express').Router;
const UserTicketController = require(APP_CONTROLLER_PATH + 'user_ticket');

let userTicketController = new UserTicketController();

router.get('/', userTicketController.get);
router.get('/:id', userTicketController.getUserTicketInfo);
router.post('/:id', userTicketController.post);
router.delete('/:id',userTicketController.del);
router.put('/:id', userTicketController.put);

module.exports = router;
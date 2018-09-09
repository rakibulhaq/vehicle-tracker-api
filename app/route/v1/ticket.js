const router = require('express').Router;
const TicketController = require(APP_CONTROLLER_PATH + 'ticket');

let ticketController = new TicketController();

router.get('/', ticketController.get);
router.get('/:id', ticketController.getTicketInfo);
router.post('/:id', ticketController.post);
router.delete('/:id', ticketController.del);
router.put('/:id', ticketController.put);

module.exports = router;
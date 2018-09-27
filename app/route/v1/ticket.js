const router = require('express').Router();
const TicketController = require(APP_CONTROLLER_PATH + 'ticket');

let ticketController = new TicketController();

router.get('/', ticketController.getAll);
router.get('/:id', ticketController.getTicketInfo);
router.post('/', ticketController.create);
router.delete('/:id', ticketController.remove);
router.put('/:id', ticketController.update);

module.exports = router;
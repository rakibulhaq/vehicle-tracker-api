const router = require('express').Router();
const MessageController = require('../../api/v1/message').MessageController;

let messageController = new MessageController();

router.get('/', messageController.getAll);
router.get('/:id', messageController.getMessageInfo);
router.post('/', messageController.create);
router.delete('/:id', messageController.remove);
router.put('/:id', messageController.update);

module.exports = router;
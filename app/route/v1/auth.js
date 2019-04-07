const router = require('express').Router();
const AuthController = require('../../api/v1/auth').AuthController;

let authController = new AuthController();

router.post('/', authController.create);
router.delete('/:token' , authController.remove);

module.exports = router;
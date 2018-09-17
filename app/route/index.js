const express = require('express');
router = express.Router();

router.use('/v1', require(APP_ROUTE_PATH + 'v1'));

module.exports = router;
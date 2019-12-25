var express = require('express');
var router = express.Router();

router.use('/', require('./job'));

module.exports = router;

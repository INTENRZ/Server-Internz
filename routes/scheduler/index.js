var express = require('express');
var router = express.Router();

router.use('/', require('./scheduler'));

module.exports = router;

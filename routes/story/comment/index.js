var express = require('express');
var router = express.Router();

router.use('/', require('./comment'));

module.exports = router;

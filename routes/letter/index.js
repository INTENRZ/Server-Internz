var express = require('express');
var router = express.Router();

router.use('/others', require('./others'));

module.exports = router;

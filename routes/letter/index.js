var express = require('express');
var router = express.Router();

router.use('/others', require('./others'));
router.use('/', require('./letter'));

module.exports = router;

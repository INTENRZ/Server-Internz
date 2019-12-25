var express = require('express');
var router = express.Router();

router.use('/', require('./calender'));
router.use('/home', require('./home'));

module.exports = router;

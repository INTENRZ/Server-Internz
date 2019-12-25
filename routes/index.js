var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/profile', require('./profile'));
router.use('/letter', require('./letter'));
router.use('/calender', require('./calender'));
router.use('/home', require('./home'));
router.use('/job', require('./job'));
router.use('/story', require('./story'));
router.use('/timeline', require('./timeline'));

module.exports = router;

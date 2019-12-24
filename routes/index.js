var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/profile', require('./profile'));
router.use('/letter', require('./letter'));

module.exports = router;

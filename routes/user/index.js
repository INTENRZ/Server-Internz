var express = require('express');
var router = express.Router();

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));
router.use('/ability', require('./ability'));
router.use('/task', require('./task'));

module.exports = router;

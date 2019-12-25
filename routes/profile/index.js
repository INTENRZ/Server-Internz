var express = require('express');
var router = express.Router();

router.use('/ability', require('./ability'));
router.use('/intro', require('./intro'));
router.use('/task', require('./task'));
router.use('/', require('./profile'));

module.exports = router;

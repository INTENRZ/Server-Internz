var express = require('express');
var router = express.Router();

router.use('/follower', require('./follower'));
router.use('/following', require('./following'));
router.use('/intro', require('./intro'));
router.use('/task', require('./task'));
router.use('/', require('./profile'));


module.exports = router;

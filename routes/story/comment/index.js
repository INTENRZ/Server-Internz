var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/', require('./comment'));

module.exports = router;

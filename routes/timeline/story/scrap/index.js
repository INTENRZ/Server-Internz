var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/', require('./scrap'));

module.exports = router;

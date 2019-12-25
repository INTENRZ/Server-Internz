var express = require('express');
var router = express.Router();

router.use('/', require('./scrap'));

module.exports = router;

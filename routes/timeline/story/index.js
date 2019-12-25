var express = require('express');
var router = express.Router();

router.use('/', require('./story'));
router.use('/:storyIdx/scrap', require('./scrap'));

module.exports = router;

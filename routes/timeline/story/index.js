var express = require('express');
var router = express.Router();

router.use('/', require('./story'));
router.use('/:storyIdx/scrap', require('./srap'));

module.exports = router;

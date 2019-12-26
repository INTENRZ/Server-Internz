var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/:timelineIdx/story', require('./story'));
router.use('/', require('./timeline'));

module.exports = router;

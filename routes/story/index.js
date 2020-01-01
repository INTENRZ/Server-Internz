var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/:storyIdx/comment', require('./comment'));
router.use('/new', require('./new'));
router.use('/count', require('./count'));
router.use('/', require('./story'));

module.exports = router;

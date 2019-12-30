var express = require('express');
var router = express.Router();

router.use('/signin', require('./signin'));
router.use('/signup1', require('./signup1'));
router.use('/signup2', require('./signup2'));
router.use('/introduce', require('./introduce'));
router.use('/task', require('./task'));
router.use('/nickname', require('./nickname'));
router.use('/taskandintro', require('./taskandintro'));

module.exports = router;

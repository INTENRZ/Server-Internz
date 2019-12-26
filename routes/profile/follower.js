var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const Profile = require('../../model/profile');
const authUtils = require('../../module/authUtils');

module.exports = router;

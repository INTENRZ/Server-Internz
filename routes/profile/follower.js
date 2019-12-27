var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtils = require('../../module/authUtils');
const Follow = require('../../model/follow');

// router.use('/', authUtils.isLoggedin);

//following -> [GET]/flollower
router.get('/', (req, res)=> {
    // const userIdx = req.decoded.idx;
    const {userIdx} = req.body;
    Follow.followerReadAll(userIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;

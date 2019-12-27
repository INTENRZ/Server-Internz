var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtils = require('../../module/authUtils');
const Follow = require('../../model/follow');

// router.use('/', authUtils.isLoggedin);

//following -> [GET]/flollowing
router.get('/', (req, res)=> {
    // const userIdx = req.decoded.idx;
    const {userIdx} = req.body;
    Follow.followingReadAll(userIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
    })
});

//following -> [POST]/flollowing
router.post('/:othersIdx', (req, res)=> {
    // const userIdx = req.decoded.idx;
    const {userIdx} = req.body;
    const othersIdx = req.params.othersIdx;
    Follow.create({userIdx, othersIdx})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
    });
});

//following -> [DELTE]/flollowing
router.delete('/:othersIdx', (req, res)=> {
    // const userIdx = req.decoded.idx;
    const {userIdx} = req.body;
    const othersIdx = req.params.othersIdx;
    Follow.delete({userIdx, othersIdx})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
    });
}); 

module.exports = router;
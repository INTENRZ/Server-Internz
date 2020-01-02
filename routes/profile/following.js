var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtils = require('../../module/authUtils');
const Follow = require('../../model/follow');

router.use('/', authUtils.isLoggedin);

//following -> [GET]/flollowing
router.get('/', (req, res)=> {
    const userIdx = req.decoded.idx;
    // const {userIdx} = req.body;
    Follow.followingReadAll(userIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    })
});

//following -> [POST]/flollowing
router.post('/', (req, res)=> {
    const userIdx = req.decoded.idx;
    // const {userIdx} = req.body;
    // const othersIdx = req.params.othersIdx;
    const {othersIdx} = req.body;
    Follow.create({userIdx, othersIdx})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        if(err.errno === 1452){
            res.status(statusCode.OK)
            .send(util.successFalse(statusCode.USER_NOT_EXIST_USER, resMessage.X_EMPTY("유저")));
            return;
        }
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    });
});

//following -> [DELTE]/flollowing
router.delete('/', (req, res)=> {
    const userIdx = req.decoded.idx;
    // const {userIdx} = req.body;
    // const othersIdx = req.params.othersIdx;
    const {othersIdx} = req.body;
    Follow.delete({userIdx, othersIdx})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        if(err.errno === 1452){
            res.status(statusCode.OK)
            .send(util.successFalse(statusCode.USER_NOT_EXIST_USER, resMessage.X_EMPTY("유저")));
            return;
        }
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
    });
}); 

module.exports = router;
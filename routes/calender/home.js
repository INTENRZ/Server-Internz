var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const authUtil = require("../../module/authUtils");
const calender = require("../../model/calender");

//router-> [GET]/calender/home/{month}
//여기서는 서버상에서 시간을 받아서 calender테이블에서 userIdx 일치하는 것들 중에
//년, 월이 일치하는 공고들만 뽑는다.(job테이블과 조인)

router.get('/:month', async(req, res)=>{
    try{
        // const userIdx = req.decoded.idx;
        const userIdx = req.body.userIdx;
        const time = req.params.month;//년, 월을 받아야한다.
        calender.readAll(userIdx, time)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
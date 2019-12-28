var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const authUtil = require("../../module/authUtils");
const calender = require("../../model/calender");

//router-> [GET]/calender/{day}
//여기서는 월,일 받는
router.get('/:day', authUtil.isLoggedin, async(req, res)=>{
    try{
        const user = req.decoded.idx;
        const time = req.params.day;
        calender.read(user, time)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/calender/{jobIdx}
router.post('/:jobIdx', authUtil.isLoggedin, async(req, res)=>{
    try{
        const user = req.decoded.idx;
        const job = req.params.jobIdx;
        calender.create(user, job)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/calender/{calenderIdx}/{month}
router.delete('/:calenderIdx/:month', authUtil.isLoggedin, async(req, res)=>{
    try{
        const user = req.decoded.idx;
        const cal = req.params.calenderIdx;
        const time = req.params.month;
        calender.delete(cal, user, time)
        .then(({code, json}) => {
            if(json['success'] == false){
                res.status(code).send(json);
                return;
            }
            calender.readAll(user, time)
            .then(({code, json}) => {
                res.status(code).send(json);
            })
            .catch(err => {
                res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
            })
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })        
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
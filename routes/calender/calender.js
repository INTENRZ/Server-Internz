var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const authUtil = require("../../module/authUtils");
const calender = require("../../model/calender");

//router-> [GET]/calender/{day}
//여기서는 월,일 받는
router.get('/:day', async(req, res)=>{
    try{
        const user = req.body.userIdx;
        const time = req.params.day;
        calender.read(user, time)
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

//router-> [POST]/calender/{jobIdx}
router.post('/:jobIdx', async(req, res)=>{
    try{
        const user = req.body.userIdx;
        const job = req.params.jobIdx;
        calender.create(user, job)
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

//router-> [DELETE]/calender/{calenderIdx}
router.delete('/:calenderIdx', async(req, res)=>{
    try{
        const user = req.body.userIdx;
        const cal = req.params.calenderIdx;
        calender.delete(cal, user)
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
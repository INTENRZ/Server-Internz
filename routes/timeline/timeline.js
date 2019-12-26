var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const Timeline = require('../../model/timeline');
const au = require('../../module/authUtils');

router.use('/', au.isLoggedin);

//router-> [GET]/timeline
router.get('/', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        Timeline.read(userIdx)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/timeline
router.post('/', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {userIdx, title, start_date, end_date, category} = req.body;
        if(!title || !start_date || !end_date || !category){
            res.statusCode(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE, statusCode.BAD_REQUEST));
        }
        Timeline.create({userIdx, title, start_date, end_date, category})
        .then(({code, json})=>{
            res.status(code).send(json)
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [PUT]/timeline/{timelineIdx}
router.put('/:timelineIdx', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {userIdx, timelineIdx, title, start_date, end_date, category} = req.body;
        if(!title || !start_date || !end_date || !category){
            res.statusCode(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE, statusCode.BAD_REQUEST));
        }
        Timeline.update({userIdx, timelineIdx, title, start_date, end_date, category})
        .then(({code, json})=>{
            res.status(code).send(json)
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}
router.delete('/:timelineIdx', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        Timeline.delete({userIdx, timelineIdx})
        .then(({code, json})=>{
            res.status(code).send(json)
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

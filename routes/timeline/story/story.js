var express = require('express');
var router = express.Router({mergeParams: true});
const util = require('../../../module/utils');
const statusCode = require('../../../module/statusCode');
const resMessage = require('../../../module/responseMessage');
const Timeline = require('../../../model/timeline');
const au = require('../../../module/authUtils');

router.use('/', au.isLoggedin);

//router-> [GET]/timeline/{timelineIdx}/story
router.get('/', async(req, res)=>{
    try{
        const timelineIdx = req.params.timelineIdx;
        Timeline.story_read(timelineIdx)
        .then(({code, json})=>{
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

//router-> [POST]/timeline/{timelineIdx}/story
router.post('/', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [PUT]/timeline/{timelineIdx}/story/{storyIdx}
router.put('/:storyIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}/story/{storyIdx}
router.delete('/:storyIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

var express = require('express');
var router = express.Router({mergeParams: true});
const util = require('../../../module/utils');
const statusCode = require('../../../module/statusCode');
const resMessage = require('../../../module/responseMessage');
const Timeline = require('../../../model/timeline');
const au = require('../../../module/authUtils');

// router.use('/', au.isLoggedin);

//router-> [GET]/timeline/{timelineIdx}/story
router.get('/', async(req, res)=>{
    try{
        const {timelineIdx} = req.params;
        Timeline.story_read(timelineIdx)
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/timeline/{timelineIdx}/story
router.post('/', async(req, res)=>{
    try{
        const {timelineIdx} = req.params;
        const {userIdx, title, content} = req.body;
        if(!title||!content){
            res.status(statusCode.OK)
            .send(util.successFalse(resMessage.NULL_VALUE));
        }
        Timeline.story_create({userIdx, timelineIdx,title, content})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err =>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [PUT]/timeline/{timelineIdx}/story/{storyIdx}
router.put('/:storyIdx', async(req, res)=>{
    try{
        const {storyIdx} = req.params;
        const {userIdx, title, content} = req.body;
        if(!title||!content){
            res.status(statusCode.OK)
            .send(util.successFalse(resMessage.NULL_VALUE));
        }
        Timeline.story_update({userIdx, storyIdx, title, content})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err =>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}/story/{storyIdx}
router.delete('/:storyIdx', async(req, res)=>{
    try{
        const {storyIdx} = req.params;
        const {userIdx} = req.body;
        Timeline.story_delete({userIdx, storyIdx})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err=>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

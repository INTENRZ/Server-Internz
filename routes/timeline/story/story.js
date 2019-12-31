var express = require('express');
var router = express.Router({mergeParams: true});
const util = require('../../../module/utils');
const statusCode = require('../../../module/statusCode');
const resMessage = require('../../../module/responseMessage');
const Timeline = require('../../../model/timeline');
const au = require('../../../module/authUtils');

router.use('/', au.isLoggedin);

//router-> [GET]/timeline/{timelineIdx}/story
router.get('/', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        // const userIdx = req.body.userIdx;
        const {timelineIdx} = req.params;
        Timeline.story_read({userIdx, timelineIdx})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/timeline/{timelineIdx}/story
router.post('/', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {timelineIdx} = req.params;
        const {title, content} = req.body;
        if(!title||!content){
            res.status(statusCode.OK)
            .send(util.successFalse(statusCode.NULL_VALUE,resMessage.NULL_VALUE));
            return;
        }
        Timeline.story_create({userIdx, timelineIdx,title, content})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err =>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [PUT]/timeline/{timelineIdx}/story/{storyIdx}
router.put('/:storyIdx', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {storyIdx} = req.params;
        const {title, content} = req.body;
        if(!title||!content){
            res.status(statusCode.OK)
            .send(util.successFalse(statusCode.NULL_VALUE,resMessage.NULL_VALUE));
            return;
        }
        Timeline.story_update({userIdx, storyIdx, title, content})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err =>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}/story/{storyIdx}
router.delete('/:storyIdx', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {storyIdx} = req.params;
        // const {userIdx} = req.body;
        Timeline.story_delete({userIdx, storyIdx})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err=>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

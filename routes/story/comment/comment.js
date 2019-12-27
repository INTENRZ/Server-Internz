var express = require('express');
var router = express.Router({mergeParams: true});
const util = require('../../../module/utils');
const statusCode = require('../../../module/statusCode');
const resMessage = require('../../../module/responseMessage');
const story = require('../../../model/story');

//router-> [POST]/story/{storyIdx}/comment
router.post('/', async(req, res)=>{
    try{
        const storyIdx = req.params.storyIdx;
        const content = req.body.content;
        const user = req.body.userIdx;
        story.comment_create(user, storyIdx, content)
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

//router-> [GET]/story/{storyIdx}/comment
router.get('/', async(req, res)=>{
    try{
        const storyIdx = req.params.storyIdx;
        story.comment_read(storyIdx)
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

//router-> [PUT]/story/{storyIdx}/comment/{commentIdx}
router.put('/:commentIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/story/{storyIdx}/comment/{commentIdx}
router.delete('/:commentIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

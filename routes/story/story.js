var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const authUtil = require("../../module/authUtils");
const story = require('../../model/story');

//router-> [GET]/story/{storyIdx}
router.get('/:storyIdx', authUtil.isLoggedin, async(req, res)=>{
    try{
        const storyIdx = req.params.storyIdx;
        const user = req.decoded.idx;
        story.story_content_read(user, storyIdx)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/story/category
router.post('/category', async(req, res)=>{
    try{
        const Category = req.body.category;
        if(!Category){
            res.status(statusCode.OK).send(util.successFalse(statusCode.MORE_VALUE_NEED, resMessage.NULL_VALUE));
            return;
        }
        story.story_category(Category)
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

//router-> [POST]/story/category/sort
router.post('/category/sort', async(req, res)=>{
    try{
        const category = req.body.category;
        const sort = req.body.sort;
        story.story_category_sort(sort, category)
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

module.exports = router;

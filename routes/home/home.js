var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const home = require('../../model/home');

//router-> [GET]/home(추천공고-3개, 프로필-4개, 스토리-4개)
router.get('/', async(req, res)=>{
    try{
        const user = req.body.userIdx;
        home.home(user)
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
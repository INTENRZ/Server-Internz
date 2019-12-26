var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const Profile = require('../../model/profile');
const authUtils = require('../../module/authUtils');
router.use('/',authUtils.isLoggedin);
//router-> [PUT]/profile/intro
router.put('/', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;  

        const {introduce} = req.body;

        if(!introduce){
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return ;
        }
        if(introduce.length ==0){
            resolve({
                code: statusCode.NOT_FOUND,
                json: util.successFalse(resMessage.X_CREATE_FAIL("한 줄 소개"))
            });
            return ;
        }
        Profile.intro_update({userIdx, introduce})
        .then(({code, json})=> res.status(code).send(json))
        .catch(err=>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                util.successFalse(resMessage.INTERNAL_SERVER_ERROR))
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

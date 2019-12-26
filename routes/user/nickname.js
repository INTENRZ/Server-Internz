var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const authUtils = require('../../module/authUtils');
router.use('/',authUtils.isLoggedin);
//router-> [PUT]/user/ability
router.get('/', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;     //토큰에서 idx가져오기
        
        console.log(userIdx);   
        
     
        User.nickname({userIdx})
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

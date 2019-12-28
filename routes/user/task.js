var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const jwt = require('../../module/jwt');
const crypto  = require('crypto');
const encrypt = require('../../module/encryption');
const authUtils = require('../../module/authUtils');

router.use('/',authUtils.isLoggedin);
//router-> [PUT]/user/task
router.put('/', async(req, res)=>{
    try{
         const userIdx = req.decoded.idx;     //토큰에서 idx가져오기

		const {task_one, task_two, task_three} = req.body;

        if(!task_one || !task_two || !task_three){
            res.status(statusCode.OK)
            .send(util.successFalse(statusCode.MORE_VALUE_NEED, resMessage.NULL_VALUE));

            return ;
        }
        User.task_update({userIdx, task_one, task_two, task_three})
        .then(({code, json})=> res.status(code).send(json))
        .catch(err=>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR))
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

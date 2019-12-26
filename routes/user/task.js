var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
//router-> [PUT]/user/task
router.put('/', async(req, res)=>{
    try{
        const decoded = req.decoded;
        const userIdx = req.params.userIdx;

		const {task_one, task_two, task_three} = req.body;

        if(!task_one || !task_two || !task_three){
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return ;
        }
        User.task_update({userIdx:decoded, userIdx:userIdx, task_one, task_two, task_three})
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

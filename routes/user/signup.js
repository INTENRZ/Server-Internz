var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const crypto  = require('crypto');
//router-> [POST]/user/signup
router.post('/', async(req, res)=>{
    try{
        const {name, password, nickname, email, age, sex, phone} = req.body;
        const salt = crypto.randomBytes(32).toString('base64');
        

        if(!name || !password || !nickname || !email || !age || !sex || !phone){
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return ;
        }
        User.create({name, password,salt, nickname, email, age, sex, phone})
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

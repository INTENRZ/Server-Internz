var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const crypto  = require('crypto');
const encrypt = require('../../module/encryption');
//router-> [POST]/user/signup1
router.post('/', async(req, res)=>{
    try{
        const {email, password, password2, phone} = req.body;      
        if(!email || !password || !password2||  !phone){
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return ;
        }
        if(password2 != password){
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.MISS_MATCH_PW))
        }
        encrypt.encrypt(password)
        .then(({hashed, salt})=> User.create1({email, password:hashed, salt, phone}))
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
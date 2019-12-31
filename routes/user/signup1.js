var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const encrypt = require('../../module/encryption');
//router-> [POST]/user/signup1
router.post('/', (req, res)=>{
    try{
        const {email} = req.body;      
        if(!email){
            res.status(statusCode.OK)
            .send(util.successFalse(statusCode.MORE_VALUE_NEED,resMessage.NULL_VALUE));
            return ;
        } 
        
        User.create1({email})
        .then(({code, json})=> res.status(code).send(json))
        .catch(err=>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR))
        })
       
    }catch(err){
        console.log(err);
    }
});
 
module.exports = router;

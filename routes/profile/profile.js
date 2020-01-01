var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const Profile = require('../../model/profile');
const authUtils = require('../../module/authUtils');
router.use('/',authUtils.isLoggedin);

// 현이 코드
// router-> [GET]/profile
router.post('/', (req, res)=>{
    try{
        const loginIdx = req.decoded.idx;
        let {userIdx} = req.body;
        if(!userIdx){
            userIdx = loginIdx;
        }
        Profile.mypage({userIdx, loginIdx})
        .then(({code,json})=> res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});


module.exports = router;
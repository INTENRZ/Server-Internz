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
router.get('/:userIdx', async(req, res)=>{
    try{
     const loginIdx = req.decoded.idx;
     const userIdx = req.params.userIdx;
        Profile.mypage({userIdx, loginIdx})
        .then(({code,json})=> res.status(code).send(json))
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});


module.exports = router;
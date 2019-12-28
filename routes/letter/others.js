var express = require('express');
var router = express.Router();
const Letter = require('../../model/letter');
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const au = require('../../module/authUtils');

router.use('/', au.isLoggedin);

//router-> [GET]/letter/others
router.get('/', async(req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        // const {userIdx} = req.body;
        Letter.readAll(userIdx)
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/letter/others
router.post('/', async(req, res)=>{
    try{
        const sender = req.decoded.idx;
        // const receiver = req.params.othersIdx;
        const {receiver , content} = req.body;
        if(!content){
            res.status(statusCode.OK)
            .send(util.successFalse(resMessage.NULL_VALUE));
        }
        Letter.create({receiver, sender, content})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});


//router-> [GET]/letter/others
router.get('/list', async(req, res)=>{
    try{
        const sender = req.decoded.idx;
        // const receiver = req.params.othersIdx;
        const {receiver} = req.body;
        // const {sender} = req.body;
        Letter.read({receiver, sender})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/letter/others
router.delete('/', async(req, res)=>{
    try{
        const sender = req.decoded.idx;
        // const receiver = req.params.othersIdx;
        const {receiver} = req.body;
        // const {sender} = req.body;
        Letter.delete({receiver, sender})
        .then(({code, json})=>{
            res.status(code).send(json)
        })
        .catch(err=>{
            throw err;
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

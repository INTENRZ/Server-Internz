var express = require('express');
var router = express.Router();
const Letter = require('../../model/letter');


//router-> [GET]/letter/others
router.get('/', async(req, res)=>{
    try{
        console.log("시작")
        const {userIdx} = req.body;
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

//router-> [GET]/letter/others
router.get('/:othersIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/letter/others
router.delete('/:othersIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

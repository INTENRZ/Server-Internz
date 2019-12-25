var express = require('express');
var router = express.Router();

//router-> [GET]/calender/{month}
//여기서는 월만 받는
router.get('/:month', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/calender/{jobIdx}
router.post('/:jobIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/calender/{calenderIdx}
router.delete('/:calenderIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;
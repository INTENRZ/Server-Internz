var express = require('express');
var router = express.Router();

//router-> [GET]/calender/home/{month}
//여기서는 월만 받는
router.get('/:month', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;
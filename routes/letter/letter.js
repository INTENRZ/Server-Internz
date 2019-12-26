var express = require('express');
var router = express.Router();
const Letter = require('../../model/letter');

//router-> [POST]/letter
router.post('/', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

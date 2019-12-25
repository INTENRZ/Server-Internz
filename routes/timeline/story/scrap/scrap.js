var express = require('express');
var router = express.Router();

//router-> [GET]/timeline/{timelineIdx}/story/{storyIdx}/scrap
router.get('/', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}/story/{storyIdx}/scrap/{scrapIdx}
router.delete('/:scrapIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

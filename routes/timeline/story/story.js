var express = require('express');
var router = express.Router();

//router-> [GET]/timeline/{timelineIdx}/story
router.get('/', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [POST]/timeline/{timelineIdx}/story
router.post('/', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [PUT]/timeline/{timelineIdx}/story/{storyIdx}
router.put('/:storyIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}/story/{storyIdx}
router.delete('/:storyIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

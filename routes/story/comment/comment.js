var express = require('express');
var router = express.Router();

//router-> [POST]/story/{storyIdx}/comment
router.post('/', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [PUT]/story/{storyIdx}/comment/{commentIdx}
router.put('/:commentIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

//router-> [DELETE]/story/{storyIdx}/comment/{commentIdx}
router.delete('/:commentIdx', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

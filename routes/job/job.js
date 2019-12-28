var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const Job = require('../../model/job');
const authUtils = require('../../module/authUtils');


//router-> [GET]/job
router.get('/', async (req, res) => {
    try {
        Job.readAll()
            .then(({
                code,
                json
            }) => {
                res.status(code).send(json)
            })
            .catch(err => {
                res.status(statusCode.INTERNAL_SERVER_ERROR
                    .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR)))
            })
    } catch (err) {
        console.log(err);
    }
});

//router-> [GET]/job/past
router.get('/past', async (req, res) => {
    try {
        Job.read()
            .then(({
                code,
                json
            }) => {
                res.status(code).send(json)
            })
            .catch(err =>{
                res.status(statusCode.INTERNAL_SERVER_ERROR
                    .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR)))
            })
    } catch (err) {
        console.log(err);
    }
});

//router-> [GET]/job/{task}
router.get('/:task', async (req, res) => {
    try {
        const {task} = req.params;
        Job.filter({task})
        .then(({code, json})=>{
            res.status(code).send(json)
        })
        .catch(err =>{
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR))
        })
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
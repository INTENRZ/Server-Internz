var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const Job = require('../../model/job');

//router-> [GET]/job
router.get('/', (req, res) => {
    try {
        Job.readAll()
            .then(({
                code,
                json
            }) => {
                res.status(code).send(json)
            })
            .catch(err => {
                console.log(err);
                res.status(statusCode.INTERNAL_SERVER_ERROR
                    .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR)))
            })
    } catch (err) {
        console.log(err);
    }
});

//router-> [GET]/job/past
router.get('/past',  (req, res) => {
    try {
        Job.read()
            .then(({
                code,
                json
            }) => {
                res.status(code).send(json)
            })
            .catch(err =>{
                console.log(err);
                res.status(statusCode.INTERNAL_SERVER_ERROR
                    .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR)))
            })
    } catch (err) {
        console.log(err);
    }
});

//router-> [GET]/job/{task}/{sort}
router.get('/:task/:sort',  (req, res) => {
    try {
        const {task} = req.params.task;
        const {sort} = req.params.sort;
        Job.filter({task, sort})
        .then(({code, json})=>{
            res.status(code).send(json)
        })
        .catch(err =>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR))
        })
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
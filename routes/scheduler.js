var express = require('express');
var router = express.Router();
const cron = require('node-cron');
const db = require('../module/pool');
const moment = require('moment');

cron.schedule('0 0 0 * * *', async() => {//자정에
    const updateDdayQuery = 'UPDATE job SET d_day = d_day + 1';
    const insertTransaction = await db.Transaction(async(connection) => {
        const updateDdayResult = await connection.query(updateDdayQuery);
    });
})

module.exports = router;

const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');
const moment = require('moment');

//calender->readAll(홈 전체 불러오기), read(특정 일 공고 불러오기), delete(특정 일 공고 삭제), create(특정 일 공고 추가)

module.exports = {
    create:() => {
        
    },
    readAll:(userIdx, time) => {
        return new Promise(async(resolve, reject) => {
            const calender = "캘린더";
            const getHomeQuery = 'SELECT b.company, b.task, b.d_day FROM calender a JOIN job b ON a.jobIdx = b.jobIdx WHERE b.end_date = ? AND a.userIdx = ?';
            const getHomeResult = await db.queryParam_Parse(getHomeQuery, [time, userIdx]);
            if(getHomeResult.length == 0){
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.X_READ_ALL_FAIL(calender))
                });
                return;
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.X_READ_ALL_SUCCESS(calender), getHomeResult)
            });
            return;
        });
    },
    read:() => {

    },
    delete:() => {

    }
};
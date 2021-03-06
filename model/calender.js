const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');

//calender->readAll(홈 전체 불러오기), read(특정 일 공고 불러오기), delete(특정 일 공고 삭제), create(특정 일 공고 추가)

const calender = "캘린더";

module.exports = {
    create:(userIdx, jobIdx) => {
        return new Promise(async(resolve, reject) => {
            const getJobQuery = 'SELECT calenderIdx FROM calender WHERE userIdx = ? AND jobIdx = ?'
            const getJobResult = await db.queryParam_Parse(getJobQuery , [userIdx, jobIdx]);
            if(getJobResult.length != 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.CALENDER_ADD_FAIL, resMessage.CALENDER_JOB_ALREADY_EXIST)
                });
                return;
            }
            const insertCalQuery = 'INSERT INTO calender (userIdx, jobIdx) VALUES (?, ?)';
            const insertCalResult = await db.queryParam_Parse(insertCalQuery , [userIdx, jobIdx]);
            if(insertCalResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.CALENDER_ADD_FAIL, resMessage.X_CREATE_FAIL(calender))
                });
                return;
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(statusCode.OK, resMessage.X_CREATE_SUCCESS(calender))
            })
            return;
        });
    },
    readAll:(userIdx, time) => {
        return new Promise(async(resolve, reject) => {
            const getHomeQuery = 'SELECT b.logo, b.jobIdx, a.calenderIdx, b.company, b.team, b.d_day, b.end_date FROM calender a JOIN job b ON a.jobIdx = b.jobIdx WHERE b.end_date LIKE ? AND a.userIdx = ? ORDER BY b.end_date';
            const getHomeResult = await db.queryParam_Parse(getHomeQuery, [time+'%', userIdx]);
            if(getHomeResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(statusCode.CALENDER_SHOW_MONTH_FAIL, resMessage.X_READ_ALL_FAIL(calender))
                });
                return;
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS(calender), getHomeResult)
            });
            return;
        });
    },
    read:(userIdx, time) => {
        return new Promise(async(resolve, reject) => {
            const getCalDayQuery = 'SELECT b.logo, a.calenderIdx, b.company, b.team, b.d_day FROM calender a JOIN job b ON a.jobIdx = b.jobIdx WHERE b.end_date = ? AND a.userIdx = ?';
            const getCalDayResult = await db.queryParam_Parse(getCalDayQuery, [time, userIdx]);
            if(getCalDayResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(statusCode.CALENDER_SHOW_DATE_FAIL, resMessage.X_READ_FAIL(calender))
                });
                return;                
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(statusCode.OK, resMessage.X_READ_SUCCESS(calender), getCalDayResult)
            });
            return;            
        });
    },
    delete:(calenderIdx, userIdx, time) => {
        return new Promise(async(resolve, reject) => {
            const deleteCalDayQuery = 'DELETE FROM a USING calender a JOIN job b ON a.jobIdx = b.jobIdx WHERE a.calenderIdx = ? AND a.userIdx = ? AND b.end_date LIKE ?';
            const deleteCalDayResult = await db.queryParam_Parse(deleteCalDayQuery, [calenderIdx, userIdx, time+'%']);
            if(deleteCalDayResult.affectedRows == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(statusCode.CALENDER_REMOVE_FAIL, resMessage.X_DELETE_FAIL(calender))
                });
                return;                  
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(statusCode.OK, resMessage.X_DELETE_SUCCESS(calender))
            });
            return;                
        });
    }
};
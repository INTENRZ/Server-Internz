const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');
const moment = require('moment');

// timeline
// read(타임라인 조회), create(타임라인 생성), update(타임라인 수정), delete(타임라인 삭제)
// story_read(타임라인 스토리 조회), story_create(타임라인 스토리 생성), story_update(타임라인 스토리 수정), story_delete(타임라인 스토리 삭제)

const TABLE = 'timeline';
const NAME = '타임라인';

const STABLE = 'story';
const SNAME = '스토리';

module.exports = {

    // 타임라인 목록 조회
    read: (userIdx) => {
        const v = [userIdx]
        const readQuery = `SELECT * FROM ${TABLE} WHERE userIdx = ? ORDER BY start_date DESC`;
        const sendData = db.queryParam_Parse(readQuery, v)
        .then(timelineList => {
            if(timelineList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.TIMELINE_NOT_EXIST_TIMELINE,resMessage.X_EMPTY(NAME))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_READ_SUCCESS(NAME), timelineList)
            }
        })
        .catch(err => {
            throw err;
        });  
        return sendData;
    },


    // 타임라인 생성
    create: ({ userIdx, title, start_date, end_date, category }) => {
        const v = [userIdx, title, start_date, end_date, category];
        const field = '`userIdx`, `title`, `start_date`, `end_date`, `category`';
        const createQuery = `INSERT INTO ${TABLE}(${field}) VALUES (?,?,?,?,?)`;
        const sendData = db.queryParam_Parse(createQuery, v)
        .then(createResult => {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(statusCode.CREATED, resMessage.X_CREATE_SUCCESS(NAME), createResult)
            }
        })
        .catch(err=>{
            throw err;
        })
        return sendData;
    },


    // 타임라인 수정
    update: async ({ userIdx, timelineIdx, title, start_date, end_date, category }) => {
        const checkQuery = `SELECT * FROM ${TABLE} WHERE timelineIdx = ${timelineIdx}`;
        const checkResult = await db.queryParam_None(checkQuery);
        if(checkResult.length === 0){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.TIMELINE_NOT_EXIST_TIMELINE, resMessage.X_EMPTY(NAME))
            }
        }
        if(checkResult[0].userIdx !== userIdx){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.USER_NOT_MATCH,resMessage.NOT_MATCH)
            }
        }

        const updateValue = [title, start_date, end_date, category];
        const updateQuery = `UPDATE ${TABLE} SET title=?, start_date=?, end_date=?, category=? WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_Parse(updateQuery, updateValue)
        .then(updateResult => {
                return {
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.OK, resMessage.X_UPDATE_SUCCESS(NAME), updateResult)
                }
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },


    // 타임라인 삭제
    delete: async ({ userIdx, timelineIdx }) => {
        const checkQuery = `SELECT * FROM ${TABLE} WHERE timelineIdx = ${timelineIdx}`;
        const checkResult = await db.queryParam_None(checkQuery);
        if(checkResult.length === 0){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.TIMELINE_NOT_EXIST_TIMELINE ,resMessage.X_EMPTY(NAME))
            }
        }
        if(checkResult[0].userIdx !== userIdx){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.USER_NOT_MATCH, resMessage.NOT_MATCH)
            }
        }
       
        const deleteQuery = `DELETE FROM ${TABLE} WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_None(deleteQuery)
        .then(deleteResult => {
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_DELETE_SUCCESS(NAME), deleteResult)
            }
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },


    // 타임라인 스토리 읽기
    story_read: ({ userIdx, timelineIdx }) => {
        const readQuery = `SELECT * FROM ${STABLE} WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_None(readQuery)
        .then(storyResult => {
            if(storyResult.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.TIMELINE_NOT_EXIST_STORY,resMessage.X_EMPTY(SNAME))
                }
            }
            if(storyResult[0].userIdx !== userIdx){
                storyResult = storyResult.concat([{"isme": "0"}]);
                return {
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.USER_NOT_MATCH ,resMessage.X_READ_SUCCESS(SNAME), storyResult)
                }
            }
            storyResult = storyResult.concat([{"isme": "1"}]);
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,resMessage.X_READ_SUCCESS(SNAME), storyResult)
            }
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },


    // 타임라인 스토리 생성
    story_create: ({ userIdx, timelineIdx, title, content }) => {
        const created_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const updated_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const v = [userIdx, timelineIdx, title, content, created_date, updated_date];
        const field = '`userIdx`, `timelineIdx`, `title`,`content`, `created_date`, `updated_date`';
        const createQuery = `INSERT INTO ${STABLE}(${field}) VALUES(?,?,?,?,?,?)`;
        const sendData = db.queryParam_Parse(createQuery, v)
        .then(createResult=> {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(statusCode.CREATED, resMessage.X_CREATE_SUCCESS(SNAME), createResult)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },


    // 타임라인 스토리 수정
    story_update: async ({ userIdx, storyIdx, title, content }) => {
        const checkQuery = `SELECT * from ${STABLE} WHERE storyIdx = ${storyIdx}`;
        const checkResult = await db.queryParam_None(checkQuery);
        if(checkResult.length === 0){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.TIMELINE_NOT_EXIST_STORY, resMessage.X_EMPTY(SNAME))
            }
        }
        if(checkResult[0].userIdx !== userIdx){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.USER_NOT_MATCH, resMessage.NOT_MATCH)
            }
        } 

        const updated_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const v = [title, content, updated_date]
        const updateQuery = `UPDATE ${STABLE} SET title=?, content=?, updated_date=? WHERE storyIdx = ${storyIdx}`;
        const sendData = db.queryParam_Parse(updateQuery, v)
        .then(updateResult => {
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,resMessage.X_UPDATE_SUCCESS(SNAME), updateResult)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },


    // 타임라인 스토리 삭제
    story_delete: async ({ userIdx, storyIdx }) => {
        const checkQuery = `SELECT * from ${STABLE} WHERE storyIdx = ${storyIdx}`;
        const checkResult = db.queryParam_None(checkQuery)
        if(checkResult.length === 0){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.TIMELINE_NOT_EXIST_STORY, resMessage.NO_X(SNAME))
            }
        }
        if(checkResult[0].userIdx !== userIdx){
            return {
                code: statusCode.OK,
                json: util.successFalse(statusCode.USER_NOT_MATCH,resMessage.NOT_MATCH)
            }
        }
  
        const deleteQuery = `DELETE FROM ${STABLE} WHERE storyIdx=${storyIdx}`;
        const sendData = db.queryParam_None(deleteQuery)
        .then(deleteResult=> {
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_DELETE_SUCCESS(SNAME), deleteResult)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    }

}
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
    read: (userIdx) => {
        const q = `SELECT * FROM ${TABLE} WHERE userIdx = ${userIdx} ORDER BY start_date DESC`;
        const sendData = db.queryParam_None(q)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(NAME))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_SUCCESS(NAME), result)
            }
        })
        .catch(err => {
            throw err;
        });  
        return sendData;
    },

    create: ({userIdx, title, start_date, end_date, category}) => {
        console.log(title)
        const field = '`userIdx`, `title`, `start_date`, `end_date`, `category`';
        const questions = '?,?,?,?,?';
        const v = [userIdx, title, start_date, end_date, category];
        const q = `INSERT INTO ${TABLE} (${field}) VALUES (${questions})`;
        const sendData = db.queryParam_Parse(q, v)
        .then(result => {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS(NAME), result)
            }
        })
        .catch(err=>{
            throw err;
        })
        return sendData;
    },
    update: ({userIdx, timelineIdx, title, start_date, end_date, category}) => {
        const checkq = `SELECT * FROM ${TABLE} WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_None(checkq)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(NAME))
                }
            }
            if(result[0].userIdx !== userIdx){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.NOT_MATCH)
                }
            }
            const v = [title, start_date, end_date, category];
            const updateq = `UPDATE ${TABLE} SET title=?, start_date=?, end_date=?, category=? WHERE timelineIdx=${timelineIdx}`;
            const updateData = db.queryParam_Parse(updateq, v)
            .then(result => {
                return {
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.X_UPDATE_SUCCESS(NAME), result)
                }
            });
            return updateData;
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },
    delete: ({userIdx, timelineIdx}) => {
        const checkq = `SELECT * FROM ${TABLE} WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_None(checkq)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(NAME))
                }
            }
            if(result[0].userIdx !== userIdx){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.NOT_MATCH)
                }
            }
            const deleteq = `DELETE FROM ${TABLE} WHERE timelineIdx=${timelineIdx}`;
            const deleteData = db.queryParam_None(deleteq)
            .then(result => {
                return {
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.X_DELETE_SUCCESS(NAME), result)
                }
            })
            return deleteData;
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },
    story_read: async ({userIdx, timelineIdx}) => {
        const q = `SELECT * FROM ${STABLE} WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_None(q)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(SNAME))
                }
            }
            if(result[0].userIdx !== userIdx){
                result = result.concat([{"isme": "0"}]);
                return {
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.X_READ_SUCCESS(SNAME), result)
                }
            }
            result = result.concat([{"isme": "1"}]);
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_SUCCESS(SNAME), result)
            }
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },
    story_create: ({userIdx, timelineIdx, title, content}) => {
        const created_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const updated_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const field = '`userIdx`, `timelineIdx`, `title`,`content`, `created_date`, `updated_date`';
        const v = [userIdx, timelineIdx, title, content, created_date, updated_date];
        const q = `INSERT INTO ${STABLE}(${field}) VALUES(?,?,?,?,?,?)`;
        const sendData = db.queryParam_Parse(q, v)
            .then(result=> {
                return {
                    code: statusCode.CREATED,
                    json: util.successTrue(resMessage.X_CREATE_SUCCESS(SNAME), result)
                }
            })
            .catch(err=>{
                throw err;
            });
            return sendData;
    },
    story_update: ({userIdx, storyIdx, title, content}) => {
        const checkq = `SELECT * from ${STABLE} WHERE storyIdx = ${storyIdx}`;
        const sendData = db.queryParam_None(checkq)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(SNAME))
                }
            }
            if(result[0].userIdx !== userIdx){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.NOT_MATCH)
                }
            }
            const updated_date = moment().format('YYYY-MM-DD HH:mm:ss');
            const updateq = `UPDATE ${STABLE} SET title=?, content=?, updated_date=? WHERE storyIdx=${storyIdx}`;
            const v = [title, content, updated_date]
            const updateData = db.queryParam_Parse(updateq, v)
            .then(result=> {
                return {
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.X_UPDATE_SUCCESS(SNAME), result)
                }
            });
            return updateData;
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },
    story_delete: ({userIdx, storyIdx}) => {
        const checkq = `SELECT * from ${STABLE} WHERE storyIdx=${storyIdx}`;
        const sendData = db.queryParam_None(checkq)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.NO_X(SNAME))
                }
            }
            if(result[0].userIdx !== userIdx){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.NOT_MATCH)
                }
            }
            const deleteq = `DELETE FROM ${STABLE} WHERE storyIdx=${storyIdx}`;
            const deleteData = db.queryParam_None(deleteq)
            .then(result=> {
                return {
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.X_DELETE_SUCCESS(SNAME), result)
                }
            });
            return deleteData;
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    }

}
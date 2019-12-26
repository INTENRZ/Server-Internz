const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');

// timeline
// read(타임라인 조회), create(타임라인 생성), update(타임라인 수정), delete(타임라인 삭제)
// story_read(타임라인 스토리 조회), story_create(타임라인 스토리 생성), story_update(타임라인 스토리 수정), story_delete(타임라인 스토리 삭제)

const TABLE = 'timeline';
const NAME = '타임라인';

const STABLE = 'story';
const SNAME = '스토리';

module.exports = {
    read: (userIdx) => {
        const q = `SELECT * FROM ${TABLE} WHERE userIdx = ${userIdx}`;
        const sendData = db.queryParam_None(q)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.X_EMPTY(NAME), statusCode.BAD_REQUEST)
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_SUCCESS(NAME), statusCode.OK, result)
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
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.X_EMPTY(NAME), statusCode.BAD_REQUEST)
                }
            }
            if(result[0].userIdx !== userIdx){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.NOT_MATCH, statusCode.BAD_REQUEST)
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
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.X_EMPTY(NAME), statusCode.BAD_REQUEST)
                }
            }
            if(result[0].userIdx !== userIdx){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.NOT_MATCH, statusCode.BAD_REQUEST)
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
    story_read: (timelineIdx) => {
        const q = `SELECT * FROM ${STABLE} WHERE timelineIdx = ${timelineIdx}`;
        const sendData = db.queryParam_None(q)
        .then(result => {
            if(result.length === 0){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.X_EMPTY(SNAME))
                }
            }
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
    story_create: () => {

    },
    story_update: () => {

    },
    story_delete: () => {

    }

}
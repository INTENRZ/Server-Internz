const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');

const TABLE = 'scrap';
const NAME= "스크랩";

//scrap-> create(스크랩), delete(스크랩취소)
module.exports = {
    create: ({userIdx, storyIdx}) => {
        const field = '`userIdx`,`storyIdx`';
        const v = [userIdx, storyIdx];
        const q = `INSERT INTO ${TABLE} (${field}) VALUES (?,?)`;
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
    delete: ({userIdx, storyIdx}) => {
            const field = '`userIdx`,`storyIdx`';
            const v = [userIdx, storyIdx];
            const q = `DELETE FROM ${TABLE} WHERE userIdx=? AND storyIdx=?`;
            const sendData = db.queryParam_Parse(q, v)
            .then(result => {
                return {
                    code: statusCode.CREATED,
                    json: util.successTrue(resMessage.X_DELETE_SUCCESS(NAME), result)
                }
            })
            .catch(err=>{
                throw err;
            })
            return sendData;
    },
    readAll: ({userIdx, storyIdx}) => {
        const scrapStoryIdxQuery = `SELECT storyIdx FROM ${TABLE} WHERE userIdx = ${userIdx}`;
        const scrapStoryQuery = `SELECT * FROM story WHERE storyIdx IN (${scrapStoryIdxQuery})`
        const sendData = db.queryParam_None(scrapStoryQuery)
        .then(storyList => {
            if(storyList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(NAME))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS(NAME), storyList)
            }
        })
        .catch(err => {
            throw err;
        })
        return sendData;
    }
};
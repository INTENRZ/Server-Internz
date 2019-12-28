const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');
const dbsync = require('../module/pool');
const moment = require('moment');

//letter->readAll(쪽지를 나눈 사람들 조회), read(특정 사람과의 쪽지 목록 조회), delete(쪽지 삭제), create(쪽지 보내기)

const TABLE = 'letter';
const NAME = '레터(쪽지)';

Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

module.exports = {
    readAll: (userIdx) => {
        // 유저와 주고 받은 상대방 찾기
        const pickLetterQuery = `SELECT DISTINCT receiver, sender FROM ${TABLE} WHERE receiver = ${userIdx} OR sender = ${userIdx}`;
        const sendData = db.queryParam_None(pickLetterQuery)
        .then( async (result) =>{
            // 상대 유저 배열에 담기 (상대방 인덱스의 중복 제거)
            let other = result.map(it => Object.values(it));
            other = other.flat(1);
            other = Array.from(new Set(other));
            other = other.filter(it=>it!==userIdx);
            // 쪽지를 나눈 사람들의 idx가 잠긴 배열 
            const pickLetterUserQuery = `SELECT userIdx ,nickname FROM user WHERE userIdx IN (${other})`;
            const userArray = await dbsync.queryParam_None(pickLetterUserQuery);
            // 각 상대방 마다 최신 쪽지 파악
            const recentMsgArray = [];
            for(var i in other){
                const recMsgQ = `SELECT content FROM ${TABLE} WHERE receiver = ${other[i]} OR sender = ${other[i]} ORDER BY created_date DESC LIMIT 1`
                const recMsgResult = await dbsync.queryParam_None(recMsgQ);
                recentMsgArray.push(recMsgResult[0]);
            }
            // userArray와 recentMsgArray 오브젝트 끼리 합치기
            const letterUserList = userArray.map((it, idx) => Object.assign(it, recentMsgArray[idx]));
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS(NAME), letterUserList)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },
    read: ({receiver, sender}) => {
        const q = `SELECT * FROM ${TABLE} WHERE sender IN (?,?) AND receiver IN (?,?) ORDER BY created_date ASC`;
        const v = [receiver, sender, receiver, sender];
        const sendData = db.queryParam_Parse(q, v)
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
        .catch(err=>{
            throw err;
        });
        return sendData;
    },
    delete: async ({receiver, sender}) => {
        const q = `DELETE FROM ${TABLE} WHERE sender IN (?,?)`;
        const v = [receiver, sender];
        const sendData = db.queryParam_Parse(q, v)
        .then(result =>{
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_DELETE_SUCCESS(NAME), result)
            }
        })
        .catch(err=> {
            throw err;
        });
        return sendData;
    },
    create: ({receiver, sender,content}) => {
        const created_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const q = `INSERT INTO ${TABLE}(\`receiver\`, \`sender\`, \`content\`, \`created_date\`) VALUES(?,?,?,?)`;
        const v = [receiver, sender, content, created_date];
        const sendData = db.queryParam_Parse(q, v)
        .then(result => {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS(NAME), result)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    }
}
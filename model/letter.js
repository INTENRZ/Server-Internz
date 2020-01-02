const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');
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
    // 쪽지 주고 받은 사람 목록 
    readAll: (userIdx) => {
        // 유저와 주고 받은 상대방 찾기
        const v = [userIdx, userIdx]
        const pickLetterQuery = `SELECT DISTINCT receiver, sender FROM ${TABLE} WHERE receiver = ? OR sender = ?`;
        const sendData = db.queryParam_Parse(pickLetterQuery, v)
        .then(async(letterUserResult) =>{

            if(letterUserResult.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.USER_NOT_EXIST_USER, resMessage.X_EMPTY("유저"))
                }
            }

            // 상대 유저 배열에 담기 (상대방 인덱스의 중복 제거)
            let letterUsers = letterUserResult.map(it => Object.values(it));
            letterUsers = Array.from(new Set(letterUsers.flat(1)));
            letterUsers = letterUsers.filter(it => it !== userIdx);
            // 쪽지를 나눈 사람들의 idx가 잠긴 배열 
            const pickLetterUserQuery = `SELECT userIdx, nickname, front_image FROM user WHERE userIdx IN (${letterUsers})`;
            const userArray = await db.queryParam_None(pickLetterUserQuery);
            // 각 상대방 마다 최신 쪽지 파악
            const recentMsgArray = [];
            for(var idx in userArray){
                const recMsgQ = `SELECT content FROM ${TABLE} WHERE receiver = ${letterUsers[idx]} OR sender = ${letterUsers[idx]} ORDER BY created_date DESC LIMIT 1`
                const recMsgResult = await db.queryParam_None(recMsgQ);
                recentMsgArray.push(recMsgResult[0]);
            }
            // userArray와 recentMsgArray 오브젝트 끼리 합치기
            const letterUserList = userArray.map((it, idx) => Object.assign(it, recentMsgArray[idx]));
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,resMessage.X_READ_ALL_SUCCESS(NAME), letterUserList)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },


    // 쪽지 읽기
    read: ({ receiver, sender }) => {
        const v = [receiver, sender, receiver, sender];
        const letterReadQ = `SELECT * FROM ${TABLE} WHERE sender IN (?,?) AND receiver IN (?,?) ORDER BY created_date ASC`;
        const sendData = db.queryParam_Parse(letterReadQ, v)
        .then(letterList => {
            if(letterList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.LETTER_NOT_EXIST_LETTER, resMessage.X_EMPTY(NAME))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,resMessage.X_READ_SUCCESS(NAME), letterList)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },


    // 쪽지 삭제
    delete: ({ receiver, sender }) => {
        const v = [receiver, sender];
        const letterDeleteQ = `DELETE FROM ${TABLE} WHERE sender IN (?,?)`;
        const sendData = db.queryParam_Parse(letterDeleteQ, v)
        .then(deleteResult =>{
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode,OK, resMessage.X_DELETE_SUCCESS(NAME), deleteResult)
            }
        })
        .catch(err=> {
            throw err;
        });
        return sendData;
    },


    // 쪽지 전송
    create: ({ receiver, sender,content }) => {
        const created_date = moment().format('YYYY-MM-DD HH:mm:ss');
        const v = [receiver, sender, content, created_date];
        const field = '`receiver`, `sender`, `content`, `created_date`';
        const sendLetterQ = `INSERT INTO ${TABLE}(${field}) VALUES (?,?,?,?)`;
        const sendData = db.queryParam_Parse(sendLetterQ, v)
        .then(createResult => {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(statusCode.CREATED, resMessage.X_CREATE_SUCCESS(NAME), createResult)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    }

}
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
        const innerq = `SELECT DISTINCT receiver, sender FROM ${TABLE} WHERE receiver = ${userIdx} OR sender = ${userIdx}`;
        const sendData = db.queryParam_None(innerq)
        .then( async (result) =>{
            let check = result.map(it => Object.values(it));
            check = check.flat(1);
            check = Array.from(new Set(check));
            check = check.filter(it=>it!==userIdx);
            const letterq = `SELECT userIdx ,nickname FROM user WHERE userIdx IN (${check})`;
            const letter_users = await dbsync.queryParam_None(letterq);
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS(NAME), letter_users)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },
    read: () => {

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
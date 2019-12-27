const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');
const dbsync = require('../module/pool');

//scrap-> create(팔로우), delete(팔로우 취소)

const TABLE = 'follow';
const FOLLOWER = "팔로워";
const FOLLOWING = "팔로잉";

module.exports = {
    create: ({userIdx, othersIdx}) => {
        const field = '`following`,`follower`';
        const v = [othersIdx, userIdx];
        const q = `INSERT INTO ${TABLE} (${field}) VALUES (?,?)`;
        const sendData = db.queryParam_Parse(q, v)
        .then(result => {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS(FOLLOWING), result)
            }
        })
        .catch(err=>{
            throw err;
        })
        return sendData;
    },
    delete: ({userIdx, othersIdx}) => {
            const field = '`following`,`follower`';
            const v = [othersIdx, userIdx];
            const q = `DELETE FROM ${TABLE} WHERE following=? AND follower=?`;
            const sendData = db.queryParam_Parse(q, v)
            .then(result => {
                return {
                    code: statusCode.CREATED,
                    json: util.successTrue(resMessage.X_DELETE_SUCCESS(FOLLOWING), result)
                }
            })
            .catch(err=>{
                throw err;
            })
            return sendData;
    },
    followingReadAll: (userIdx) => {
        const followingIdxQuery = `SELECT following FROM ${TABLE} WHERE follower = ${userIdx}`;
        const followingUserQuery = `SELECT front_image, nickname, introduce FROM user WHERE userIdx IN (${followingIdxQuery})`
        const sendData = db.queryParam_None(followingUserQuery)
        .then(followingList => {
            if(followingList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(FOLLOWING))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS(FOLLOWING), followingList)
            }
        })
        .catch(err => {
            throw err;
        })
        return sendData;
    },
    followerReadAll: (userIdx) => {
        const followerIdxQuery = `SELECT follower FROM ${TABLE} WHERE following = ${userIdx}`;
        const followerUserQuery = `SELECT front_image, nickname, introduce FROM user WHERE userIdx IN (${followerIdxQuery})`
        const sendData = db.queryParam_None(followerUserQuery)
        .then(followerList => {
            if(followerList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.X_EMPTY(FOLLOWER))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS(FOLLOWER), followerList)
            }
        })
        .catch(err => {
            throw err;
        })
        return sendData;
    }
};
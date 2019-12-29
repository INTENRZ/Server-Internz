const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');

//scrap-> create(팔로우), delete(팔로우 취소)

const TABLE = 'follow';
const FOLLOWER = "팔로워";
const FOLLOWING = "팔로잉";

module.exports = {

    // 팔로우
    create: ({userIdx, othersIdx}) => {
        const v = [othersIdx, userIdx];
        const field = '`following`,`follower`';
        const q = `INSERT INTO ${TABLE}(${field}) VALUES (?,?)`;
        const sendData = db.queryParam_Parse(q, v)
        .then(createResult => {
            return {
                code: statusCode.CREATED,
                json: util.successTrue(statusCode.CREATED,resMessage.X_CREATE_SUCCESS(FOLLOWING), createResult)
            }
        })
        .catch(err=>{
            throw err;
        })
        return sendData;
    },


    // 팔로우 취소
    delete: ({ userIdx, othersIdx }) => {
            const v = [othersIdx, userIdx];
            const q = `DELETE FROM ${TABLE} WHERE following = ? AND follower = ?`;
            const sendData = db.queryParam_Parse(q, v)
            .then(deleteResult => {
                return {
                    code: statusCode.CREATED,
                    json: util.successTrue(statusCode.CREATED,resMessage.X_DELETE_SUCCESS(FOLLOWING), deleteResult)
                }
            })
            .catch(err=>{
                throw err;
            })
            return sendData;
    },


    // 팔로우 리스트
    followingReadAll: (userIdx) => {
        const followingIdxQuery = `SELECT following FROM ${TABLE} WHERE follower = ${userIdx}`;
        const followingUserQuery = `SELECT front_image, nickname, introduce FROM user WHERE userIdx IN (${followingIdxQuery})`
        const sendData = db.queryParam_None(followingUserQuery)
        .then(followingList => {
            if(followingList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.PROFILE_FOLLOW_NOT_EXIST_FOLLOW,resMessage.X_EMPTY(FOLLOWING))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS(FOLLOWING), followingList)
            }
        })
        .catch(err => {
            throw err;
        })
        return sendData;
    },


    // 팔로워 리스트
    followerReadAll: (userIdx) => {
        const followerIdxQuery = `SELECT follower FROM ${TABLE} WHERE following = ${userIdx}`;
        const followerUserQuery = `SELECT front_image, nickname, introduce FROM user WHERE userIdx IN (${followerIdxQuery})`
        const sendData = db.queryParam_None(followerUserQuery)
        .then(followerList => {
            if(followerList.length === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.PROFILE_FOLLOW_NOT_EXIST_FOLLOWER,resMessage.X_EMPTY(FOLLOWER))
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,resMessage.X_READ_ALL_SUCCESS(FOLLOWER), followerList)
            }
        })
        .catch(err => {
            throw err;
        })
        return sendData;
    }

}
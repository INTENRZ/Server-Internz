const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');
const dbsync = require('../module/pool');


//scrap-> create(스크랩), delete(스크랩취소)

const TABLE = 'follow';
const FOLLOWER = "follower";
const FOLLOWING = "following";

module.exports = {
    create: () => {

    },
    delete: () => {

    },
    followingReadAll: (userIdx) => {
        const followingIdxQuery = `SELECT following FROM ${TABLE} WHERE userIdx = ${userIdx}`;
        const followingUserQuery = `SELECT front_image, nickname, introduce FROM user WHERE userIdx IN ${followingIdxQuery}`
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
        const followerIdxQuery = `SELECT follower FROM ${TABLE} WHERE userIdx = ${userIdx}`;
        const followerUserQuery = `SELECT front_image, nickname, introduce FROM user WHERE userIdx IN ${followerIdxQuery}`
        const sendData = db.queryParam_None(followerUserQuery)
        .then(followingList => {
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
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');
const crypto = require('crypto');
const encrypt = require('../module/encryption');
const Auth = require('../module/jwt');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
//profile->intro_update(한 줄 소개 작성), intro_delete(한 줄 소개 삭제), readAll(프로필 조회), task_update(관심 직군 수정)
const table ="user";
const task ="관심 직군";
module.exports = {
     intro_update:({userIdx, introduce}) => {
        return new Promise(async(resolve, reject) => {
           
            const checkQuery = `SELECT userIdx FROM user WHERE userIdx = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);
    
            if(checkResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return ;
            }
            
        
            const query = `UPDATE ${table} SET introduce='${introduce}' WHERE userIdx = '${userIdx}' `;
            const result = await db.queryParam_None(query);
           
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS("한 줄 소개"))
            })
        });
    },
    // ----------------------------- 현이 코드 -----------------------------
    mypage:({userIdx, loginIdx}) => {
        return new Promise(async(resolve, reject)=>{
            // 유저에 해당하는 열 추출, 해당 유저의 타임라인 추출
            const checkQuery = `SELECT userIdx,nickname, task_one, task_two, task_three,front_image, back_image,introduce FROM user WHERE userIdx =?`;
            const timeQuery = `SELECT * FROM timeline WHERE userIdx=?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);
            if(checkResult.length == 0){
                resolve({
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.NOT_FOUND, resMessage.NO_USER)
                });
                return ;
            }
            const timeResult = await db.queryParam_Parse(timeQuery, [userIdx]);

            // 팔로워 팔로잉 수 추출
            const followerNumberQuery = `SELECT COUNT(*) AS followernumber FROM follow WHERE follower=${userIdx}`;
            const followingNumberQuery = `SELECT COUNT(*) AS followingnumber FROM follow WHERE following=${userIdx}`;
            const followerResult = await db.queryParam_None(followerNumberQuery);
            const followingResult = await db.queryParam_None(followingNumberQuery);
            // 마이 페이지인지 타인의 페이지인지 구별
            if(userIdx == loginIdx) {
                const result = checkResult.concat(timeResult, followerResult, followingResult, {"isme":'1'});
                resolve({
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS("프로필"),result)
                });
                return;
            } else {
                const isFollowQuery = `SELECT * FROM follow WHERE following = ? AND follower = ?`
                const isFollowResult = await db.queryParam_Parse(isFollowQuery, [userIdx, loginIdx]);
                if (isFollowResult.length === 0){
                    var isFollow = {"isfollow": '0'}
                } else {
                    var isFollow = {"isfollow": '1'}
                }
                const result = checkResult.concat(timeResult, followerResult, followingResult, {"isme": '0'}, isFollow);
                resolve({
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS("프로필"),result)
                })
            }
            
        });
    },
    // ----------------------------------------------------------------------
     task_update:({userIdx, task_one, task_two, task_three}) => {
        return new Promise(async(resolve, reject) => {
           
            const checkQuery = `SELECT userIdx FROM user WHERE userIdx = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);
           
            
            if(checkResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return ;
            }
            
            const query = `UPDATE ${table} SET task_one='${task_one}',task_two='${task_two}',task_three='${task_three}' WHERE userIdx = '${userIdx}' `;
            const result = await db.queryParam_None(query);


            if(result.length ==0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.X_CREATE_FAIL(task))
                });
                return ;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS(task))
            })
        });
    },
};
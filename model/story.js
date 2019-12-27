const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');
const moment = require('moment');

//story->create(스토리 댓글 생성),readAll(스토리 전체 중 최신순 조회), read(스토리 전체 중 조회순 조회),
//       story_content_read(스토리 내용 조회),update(해당 스토리 댓글 수정)
//       delete(해당 스토리 댓글 삭제)

const story = "스토리";

module.exports = {
    comment_create:(userIdx, storyIdx, content) =>{
        return new Promise(async(resolve, reject) => {
            // const final = [];
            const getUserQuery = 'SELECT nickname, front_image FROM user WHERE userIdx = ?';
            const getUserResult = await db.queryParam_Parse(getUserQuery, [userIdx]);
            if(getUserResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.COMMENT_CREATE_FAIL(story))
                });
                return;
            }
            const time = moment().format("YYYY-MM-DD HH:mm");
            getUserResult[0]['time'] = time;
            const saveCommentQuery = 'INSERT INTO comment (userIdx, storyIdx, created_date, content) VALUES (?, ?, ?, ?)';
            const saveCommentResult = await db.queryParam_Parse(saveCommentQuery, [userIdx, storyIdx, time, content]);
            if(saveCommentResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.COMMENT_CREATE_FAIL)
                });
                return;
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.COMMENT_CREATE_SUCCESS, getUserResult)
            });
            return;
        });
   },
    latest:() => {
        return new Promise(async(resolve, reject) => {
            const getStoryQuery = 'SELECT b.title, a.nickname, b.created_date FROM story b JOIN user a ON a.userIdx = b.userIdx ORDER BY created_date DESC'
            const getStoryResult = await db.queryParam_Parse(getStoryQuery);
            if(getStoryResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.X_READ_ALL_FAIL(story))
                });
                return;  
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.X_READ_ALL_SUCCESS(story), getStoryResult)
            });
            return;
        });
    },
    count:() => {

    },
    story_content_read:()=>{

    },
    comment_update:()=>{

    },
    comment_delete:()=>{

    }
};
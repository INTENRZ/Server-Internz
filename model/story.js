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
            // const getUserQuery = 'SELECT nickname, front_image FROM user WHERE userIdx = ?';
            // const getUserResult = await db.queryParam_Parse(getUserQuery, [userIdx]);
            // if(getUserResult.length == 0){
            //     resolve({
            //         code : statusCode.OK,
            //         json: util.successFalse(resMessage.COMMENT_CREATE_FAIL(story))
            //     });
            //     return;
            // }
            const time = moment().format("YYYY-MM-DD HH:mm");
            // getUserResult[0]['time'] = time;
            const saveCommentQuery = 'INSERT INTO comment (userIdx, storyIdx, created_date, content) VALUES (?, ?, ?, ?)';
            const saveCommentResult = await db.queryParam_Parse(saveCommentQuery, [userIdx, storyIdx, time, content]);
            if(saveCommentResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.COMMENT_CREATE_FAIL)
                });
                return;
            }
            //select하기
            const getCommentQuery = 'SELECT a.nickname, a.front_image, b.content, b.created_date FROM comment b JOIN user a ON a.userIdx = b.userIdx WHERE storyIdx = ? ORDER BY b.created_date';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[storyIdx]);
            if(getCommentResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.COMMENT_READ_FAIL)
                });
                return;                
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.COMMENT_READ_SUCCESS, getCommentResult)
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
    story_content_read:(userIdx, storyIdx)=>{
        return new Promise(async(resolve, reject) => {
            //일단 조회수 ++
            const updateCountQuery = 'UPDATE story SET count = count + 1 WHERE storyIdx = ?';
            const updateCountResult = await db.queryParam_Parse(updateCountQuery ,[storyIdx]);
            if(updateCountResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.STORY_READ_FAIL)
                });
                return; 
            }
            const getstoryQuery = 'SELECT b.title, b.content, b.created_date, a.nickname, a.front_image, a.introduce FROM story b JOIN user a ON a.userIdx = b.userIdx WHERE storyIdx = ?';
            const getstoryResult = await db.queryParam_Parse(getstoryQuery,[storyIdx]);
            if(getstoryResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.STORY_READ_FAIL)
                });
                return; 
            }
            const getUserIdxQuery = 'SELECT userIdx FROM story WHERE storyIdx = ?';
            const getUserIdxResult = await db.queryParam_Parse(getUserIdxQuery,[storyIdx]);
            if(getUserIdxResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.STORY_READ_FAIL)
                });
                return;
            }
            if(getUserIdxResult[0]['userIdx'] == userIdx){//스토리 쓴 사람과 로그인한 사람이 같으면
                getstoryResult[0]['isme'] = 1;
                resolve({
                    code : statusCode.OK,
                    json : util.successTrue(resMessage.STORY_READ_SUCCESS, getstoryResult)
                });
                return;
            }else{
                getstoryResult[0]['isme'] = 0;
                resolve({
                    code : statusCode.OK,
                    json : util.successTrue(resMessage.STORY_READ_SUCCESS, getstoryResult)
                });
                return;
            }
        });
    },
    comment_read:(storyIdx)=>{
        return new Promise(async(resolve, reject) => {
            const getCommentQuery = 'SELECT a.nickname, a.front_image, b.content, b.created_date FROM comment b JOIN user a ON a.userIdx = b.userIdx WHERE storyIdx = ? ORDER BY b.created_date';
            const getCommentResult = await db.queryParam_Parse(getCommentQuery,[storyIdx]);
            if(getCommentResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json: util.successFalse(resMessage.COMMENT_READ_FAIL)
                });
                return;                
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.COMMENT_READ_SUCCESS, getCommentResult)
            });
            return;
        });
    },
    story_category:()=>{
        //스토리의 카테고리는 속한 타임라인의 카테고리와 같다.

    },
    comment_update:()=>{

    },
    comment_delete:()=>{

    }
};
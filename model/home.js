const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');

// home -> home(첫 홈 화면 띄우기)

const home = "메인 홈";

module.exports = {
    home : (userIdx) => {
        return new Promise(async(resolve, reject) => {
            const final = new Object();
            //맞춤 공고->공고의 task와 유저의 관심 직무가 얼마나 일치하냐에 따라 띄워준다.(유저의 관심 직무는 무조건 3개)
            const getUserTaskQuery = 'SELECT task_one, task_two, task_three FROM user WHERE userIdx = ?';
            const getUserTaskResult = await db.queryParam_Parse(getUserTaskQuery, [userIdx]);
            if(getUserTaskResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.HOME_SHOW_FAIL, resMessage.X_READ_ALL_FAIL(home))
                });
                return;
            }
            const task = [];
            const a = getUserTaskResult[0]['task_one'];
            const b = getUserTaskResult[0]['task_two'];
            const c = getUserTaskResult[0]['task_three'];
            const getJobQuery = 'SELECT jobIdx, logo, company, team, d_day, url, count(jobIdx) as cnt from ' + 
            '(SELECT jobIdx, logo, company, team, d_day, url from job WHERE task1 IN (?, ?, ?) UNION ALL ' +
            'SELECT jobIdx, logo, company, team, d_day, url from job WHERE task2 IN (?, ?, ?) UNION ALL ' +
            'SELECT jobIdx, logo, company, team, d_day, url from job WHERE task3 IN (?, ?, ?)) a group by jobIdx order by cnt desc limit 3';
            const getJobResult = await db.queryParam_Parse(getJobQuery, [a,b,c,a,b,c,a,b,c]);
            for(i=0; i<getJobResult.length; i++){
                task.push(getJobResult[i]);
            }
            if(getJobResult.length < 3){//없으면 그냥 가장 최신 공고 3개
                const getJobLateQuery = 'SELECT logo, company, team, d_day, url FROM job ORDER BY start_date DESC limit ?';
                const getJobLateResult = await db.queryParam_Parse(getJobLateQuery, (3-getJobResult.length));
                if(getJobLateResult.length == 0){
                    resolve({
                        code : statusCode.OK,
                        json : util.successFalse(statusCode.HOME_SHOW_FAIL, resMessage.X_READ_FAIL(home))
                    });
                    return;
                }
                for(j=0; j<getJobLateResult.length; j++){
                    task.push(getJobLateResult[j]);
                }
            }
            final.task = task;

            //추천 프로필 -> 유저와 관심직무가 비슷한 프로필을 추천해준다.
            const profile = [];
            const getProfileQuery = 'SELECT front_image, nickname, introduce, userIdx, count(userIdx) as cnt from ' + 
            '(SELECT front_image, nickname, introduce, userIdx from user WHERE task_one IN (?, ?, ?) UNION ALL ' +
            'SELECT front_image, nickname, introduce, userIdx from user WHERE task_two IN (?, ?, ?) UNION ALL ' +
            'SELECT front_image, nickname, introduce, userIdx from user WHERE task_three IN (?, ?, ?)) a group by userIdx HAVING userIdx NOT IN (?) order by cnt desc limit 4';
            const getProfileResult = await db.queryParam_Parse(getProfileQuery , [a,b,c,a,b,c,a,b,c, userIdx]);
            for(i=0; i<getProfileResult.length; i++){
                profile.push(getProfileResult[i]);
            }
            if(getProfileResult.length < 4){
                const getRandomQuery = 'SELECT front_image, nickname, introduce, userIdx FROM user WHERE userIdx NOT IN (?) ORDER BY RAND() limit ?';
                const getRandomResult = await db.queryParam_Parse(getRandomQuery, [userIdx, 4-getProfileResult.length]);
                if(getRandomResult.length == 0){
                    resolve({
                        code : statusCode.OK,
                        json : util.successFalse(statusCode.HOME_SHOW_FAIL, resMessage.X_READ_FAIL(home))
                    });
                    return;
                }
                for(j=0; j<getRandomResult.length; j++){
                    profile.push(getRandomResult[j]);
                }
            }
            final.profile = profile;

            //오늘의 스토리 -> 무조건 최신순 4개(created_date 순)
            const story = [];
            const getStoryQuery = 'SELECT title, content, storyIdx FROM story ORDER BY created_date DESC limit 4';
            const getStoryResult = await db.queryParam_Parse(getStoryQuery);
            if(getStoryResult.length == 0){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(statusCode.HOME_SHOW_FAIL, resMessage.X_READ_FAIL(home))
                });
                return;
            }
            for(i=0; i<getStoryResult.length; i++){
                story.push(getStoryResult[i]);
            }
            final.story = story;
            resolve({
                code : statusCode.OK,
                json : util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS(home), final)
            });
            return;
        });
    }
}
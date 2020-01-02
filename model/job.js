const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/poolAsync');

//job->readAll(공고 전체 불러오기), read(지난 공고 불러오기), filter(직무 1개 선택하면 나의 관심직무와 일치하면 필터)
//로고 추가. statusCode추가 model뿐만 아니니라 router 에도 넣어주기.
module.exports = {

    // 공고 전체 조회
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const jobAllquery = `SELECT * FROM job ORDER BY end_date DESC`;
            const jobAllResult = await db.queryParam_None(jobAllquery);

            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS("공고"), jobAllResult)
            })
        })
    },


    // 지난 공고 조회
    read: () => {
        return new Promise(async(resolve, reject) =>{
            const jobqeury = `SELECT * FROM job WHERE ispast = '1'`;
            const jobresult = await db.queryParam_None(jobqeury);

            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_READ_ALL_SUCCESS("지난 공고"),jobresult)
            })

        })
    },


    // 공고 필터링후 정렬 조회
    filter: ({ task , sort}) => {//sort==0 ->최신순, sort==1 ->지난 공고
        const v = [task, task, task];
        const v_ = [task, task, task, '1'];
        if(sort == 0){
            const getTaskQuery = 'SELECT * FROM job WHERE task1 = ? OR task2 = ? OR task3 = ? ORDER BY end_date DESC';
            const getTaskResult = db.queryParam_Parse(getTaskQuery, v);
            if(getTaskResult.legnth == 0){
                return{
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.JOB_FILTER_FAIL, "필터와 일치하는 공고가 없습니다.")
                };
            }
            return{
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,`${task} 필터 조회 성공`, getTaskResult)
            };
        }else if(sort == 1){
            const getTaskQuery = 'SELECT * FROM job WHERE task1 = ? OR task2 = ? OR task3 = ? WHERE ispast = ?';
            const getTaskResult = db.queryParam_Parse(getTaskQuery, v_);
            if(getTaskResult.legnth == 0){
                return{
                    code: statusCode.OK,
                    json: util.successFalse(statusCode.JOB_FILTER_FAIL, "필터와 일치하는 공고가 없습니다.")
                };
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK,`${task} 필터 조회 성공`, getTaskResult)
            };
        }
    }
}
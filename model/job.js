const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const dbsync = require('../module/pool');
const db = require('../module/poolAsync');

//job->readAll(공고 전체 불러오기), read(지난 공고 불러오기), filter(직무 1개 선택하면 나의 관심직무와 일치하면 필터)

module.exports = {

    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const jobAllquery = `SELECT * FROM job `;
            const jobAllResult = await db.queryParam_None(jobAllquery);

            console.log(jobAllResult);
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS("공고"), jobAllResult)
            })
        })
    },

    read: () => {

    },
    filter: ({task}) => {
        const pickTaskQuery = `SELECT * FROM job WHERE task1 = task OR task2 = task OR task3 = task`;
        const sendData = db.queryParam_None(pickTaskQuery)
        .then( async (result) => {
            if(result.legnth === 0){
                return {
                    code: statusCode.OK,
                    json: util.successFalse("필터와 일치하는 공고가 없습니다.")
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(`${task} 필터 조회 성공`, result)
            }
        })
        .catch(err => {
            throw err;
        });
        return sendData
    }

};
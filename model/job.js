const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');

//job->readAll(공고 전체 불러오기), read(지난 공고 불러오기), filter(직무 1개 선택하면 나의 관심직무와 일치하면 필터)

module.exports = {

    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const jobAllquery = `SELECT * FROM job `;
            const jobAllResult = await db.queryParam_None(jobAllquery);

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS("공고"), jobAllResult)
            })
        })
    },

    read: () => {
        return new Promise(async(resolve, reject) =>{
            const jobqeury = `SELECT * FROM job WHERE ispast = '1'`;
            const jobresult = await db.queryParam_None(jobqeury);

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS("지난 공고"),jobresult)
            })

        })
    },
    filter: () => {

    }

};
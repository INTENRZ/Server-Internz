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

module.exports = {
    intro_update:() => {

    },
    readAll:({userIdx}) => {
        return new Promise(async(resolve, reject)=>{
            const checkQuery = `SELECT userIdx,nickname, task_one, task_two, task_three,front_image, back_image,introduce FROM user WHERE userIdx =?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);
            const timeQuery = `SELECT * FROM timeline WHERE userIdx=?`;
            const timeResult = await db.queryParam_Parse(timeQuery, [userIdx]);

            const result = checkResult.concat(timeResult);
            if(checkResult.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return ;
            }
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_ALL_SUCCESS("프로필"),result)
            })
        });

    },
    intro_delete:() => {

    },  
    task_update:() => {

    }
};
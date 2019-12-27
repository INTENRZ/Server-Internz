const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');
const crypto = require('crypto');
const encrypt = require('../module/encryption');
const Auth = require('../module/jwt');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});
//create(회원가입,로그인->닉네임, id 둘다 중복 확인), signin(로그인), task_update(관심직군 수정), ability_update(보유역량 수정)
const USER = "회원가입";
const nick = "닉네임";
const email_c = "email";
const task = "관심직군";
const ability = "보유역량";
const table = 'user';
module.exports = {
    create1: ({
        email,
        password,
        salt,
        phone
    }) => {
        return new Promise(async (resolve, reject) => {
            const checkEmailQuery = `SELECT email FROM user WHERE email = ?`;
            const checkEmailResult = await db.queryParam_Parse(checkEmailQuery, [email]);

            console.log(checkEmailResult)
            if (checkEmailResult.length != 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X(email_c))
                });
                return;
            }

            const field = `email, password, salt, phone`;
            const question = `?,?,?,?`;
            const values = [email, password, salt, phone];
            const query = `INSERT INTO ${table} (${field}) VALUES(${question}) `;

            const result = await db.queryParam_Parse(query, values);
            console.log(email);
            const findidx = `SELECT userIdx FROM ${table} WHERE email=?`;
            const find = await db.queryParam_Parse(findidx, [email]);

            console.log(find);
            if (!result || result.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.SIGNUP_FAIL)
                });
                return;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.SIGNUP_SUCCESS, find)
            })
        });


    },
    create2: ({
        userIdx,
        name,
        nickname,
        age,
        sex
    }) => {
        return new Promise(async (resolve, reject) => {

            const checkNickQuery = `SELECT nickname FROM user WHERE nickname = ?`;
            const checkNickResult = await db.queryParam_Parse(checkNickQuery, [nickname]);

            if (checkNickResult.length != 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X(nick))
                });
                return;
            }

            const field = `name, nickname, age, sex`;
            const question = `?,?,?,?`;

            const values = [name, nickname, age, sex];
            const query = `UPDATE ${table} SET name = '${name}', nickname ='${nickname}', age='${age}', sex = '${sex}' WHERE userIdx= '${userIdx}'`;

            const result = await db.queryParam_Parse(query, values);

            if (!result || result.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.SIGNUP_FAIL)
                });
                return;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.SIGNUP_SUCCESS)
            })
        });


    },
    task_update: ({
        userIdx,
        task_one,
        task_two,
        task_three
    }) => {
        return new Promise(async (resolve, reject) => {

            const checkQuery = `SELECT userIdx FROM user WHERE userIdx = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);


            if (checkResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return;
            }

            const field = `userIdx, task_one, task_two, task_three`;
            const question = `?,?,?,?`;
            const values = [userIdx, task_one, task_two, task_three];
            const query = `UPDATE ${table} SET task_one='${task_one}',task_two='${task_two}',task_three='${task_three}' WHERE userIdx = '${userIdx}' `;
            const result = await db.queryParam_None(query);
            console.log(result);

            if (result.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.X_CREATE_FAIL(task))
                });
                return;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS(task))
            })
        });
    },
    intro_update: ({
        userIdx,
        introduce,
        front_image
    }) => {
        return new Promise(async (resolve, reject) => {

            const checkQuery = `SELECT userIdx FROM user WHERE userIdx = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);

            
            if (checkResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return;
            }

            const field = `userIdx, introduce, front_image`;
            const question = `?,?,?`;
            const values = [userIdx, introduce, front_image];
            const query = `UPDATE ${table} SET introduce='${introduce}', front_image='${front_image}' WHERE userIdx = '${userIdx}' `;
            const result = await db.queryParam_None(query);
            console.log(result);
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS("한 줄 소개"))
            })
        });
    },
    nickname: ({
        userIdx
    }) => {
        return new Promise(async (resolve, reject) => {
            const checkQuery = `SELECT userIdx FROM user WHERE userIdx = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);


            if (checkResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return;
            }
            const result = checkResult[0].nickname;
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_READ_SUCCESS("닉네임"), result)
            })
        });
    },

    login: ({
        email,
        password
    }) => {
        return new Promise(async (resolve, reject) => {

            const query = `SELECT * FROM ${table} WHERE email = '${email}'`;
            const result = await db.queryParam_None(query);

            if (result.length == 0) {
                resolve({
                    code: statusCode.OK,
                    json: util.successFalse(resMessage.NO_USER)
                });
                return;
            }
            
            
            const user = result[0];
            
            const {
                hashed
            } = await encrypt.encryptWithSalt(password, user.salt);
            if (user.password != hashed) {
                resolve({
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.MISS_MATCH_PW)
                });
                return;
            }

            let token = Auth.sign(user);
            if(user.check == 0){
                const field = `check`;
                const check_f ='1';
                const check = `UPDATE ${table} SET \`check\` = '1' WHERE email = '${email}' `;
                const checkresult = await db.queryParam_None(check);
                token = Object.assign(token, {"isFirst": '0'});
                
                resolve({
                    code: statusCode.OK,
                    json: util.successTrue(resMessage.LOGIN_SUCCESS, token)
                });
        }
        else{
            token = Object.assign(token, {"isnotFirst": '1'});
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.LOGIN_SUCCESS, token)
            });
        }

        });

    }

};
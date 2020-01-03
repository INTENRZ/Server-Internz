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
        email
    }) => {
        return new Promise(async (resolve, reject) => {
            const checkEmailQuery = `SELECT email FROM user WHERE email = ?`;
            const checkEmailResult = await db.queryParam_Parse(checkEmailQuery, [email]);
        
            if (checkEmailResult.length != 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(statusCode.USER_ALREADY_EXIST_EMAIL, resMessage.NO_X(email_c))
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, "email 중복 없습니다! 회원가입 가능")
            })
           
        });


    },
    create2: ({
        email,
        password,
        salt,
        phone,
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
                    json: util.successFalse(statusCode.USER_ALREADY_EXIST_NICK, resMessage.NO_X(nick))
                });
                return;
            }

            const field = `email, password, salt, phone, name, nickname, age, sex`;
            const question = `?,?,?,?,?,?,?,?`;
            const values = [email, password, salt, phone, name, nickname, age, sex];
            const query = `INSERT INTO ${table} (${field}) VALUES(${question}) `;

            const result = await db.queryParam_Parse(query, values);

            if (!result || result.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(statusCode.MORE_VALUE_NEED, resMessage.SIGNUP_FAIL)
                });
                return;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.SIGNUP_SUCCESS)
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


            const query = `UPDATE ${table} SET task_one='${task_one}',task_two='${task_two}',task_three='${task_three}' WHERE userIdx = '${userIdx}' `;
            const result = await db.queryParam_None(query);

            const check = `UPDATE ${table} SET \`check\` = '1' WHERE userIdx = '${userIdx}' `;
            const checkresult = await db.queryParam_None(check);

            if (result.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(statusCode.MORE_VALUE_NEED, resMessage.X_CREATE_FAIL(task))
                });
                return;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_CREATE_SUCCESS(task))
            })
        });
    },
    intro_update: ({
        userIdx,
        introduce,
        front_image
    }) => {
        return new Promise(async (resolve, reject) => {


            const query = `UPDATE ${table} SET introduce='${introduce}', front_image='${front_image}' WHERE userIdx = '${userIdx}' `;
            const result = await db.queryParam_None(query);

            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_CREATE_SUCCESS("한 줄 소개"))
            })
        });
    },
    nickname: ({
        userIdx
    }) => {
        return new Promise(async (resolve, reject) => {
            const checkQuery = `SELECT nickname FROM user WHERE userIdx = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, [userIdx]);


            if (checkResult.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(statusCode.USER_NOT_EXIST_USER, resMessage.NO_USER)
                });
                return;
            }
            const result = checkResult[0].nickname;
            const result1 = Object.assign({"닉네임":result});
                
            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_READ_SUCCESS("닉네임"), result1)
            })
        });
    },
    taskandintro: ({
        userIdx,
        task_one,
        task_two,
        task_three,
        introduce,
        front_image

    }) => {
        return new Promise(async (resolve, reject) => {


            const query = `UPDATE user SET task_one='${task_one}',task_two='${task_two}',task_three='${task_three}',introduce='${introduce}', front_image='${front_image}' WHERE userIdx = ? `;
            const result = await db.queryParam_Parse(query, [userIdx]);
            
            const check = `UPDATE ${table} SET \`check\` = '1' WHERE userIdx = ? `;
            const checkresult = await db.queryParam_Parse(check, [userIdx]);

            resolve({
                code: statusCode.OK,
                json: util.successTrue(statusCode.OK, resMessage.X_CREATE_SUCCESS("관심 직군과 프로필"))
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
                    json: util.successFalse(statusCode.USER_NOT_EXIST_USER resMessage.NO_USER)
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
                    json: util.successTrue(statusCode.USER_NOT_SAME_PW, resMessage.MISS_MATCH_PW)
                });
                return;
            }

            let token = Auth.sign(user);



            if (user.check == 0) {

                token = Object.assign(token, {
                    "isFirst": '0'
                });

                resolve({
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.OK, resMessage.LOGIN_SUCCESS, token)
                });
            } else {
                token = Object.assign(token, {
                    "isFirst": '1'
                });
                resolve({
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.OK, resMessage.LOGIN_SUCCESS, token)
                });
            }

        });

    }

};
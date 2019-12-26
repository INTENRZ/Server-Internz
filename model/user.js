const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');

//create(회원가입,로그인->닉네임, id 둘다 중복 확인), signin(로그인), task_update(관심직군 수정), ability_update(보유역량 수정)
const USER = "회원가입";
const table = 'user';
module.exports = {
    create:({name, password, salt, nickname, email, age, sex, phone}) =>{
        return new Promise(async (resolve, reject)=>{
            const checkEmailQuery = `SELECT email FROM user WHERE email = ?`;
            const checkEmailResult = await db.queryParam_Parse(checkEmailQuery, [email]);
            
            console.log(checkEmailResult)
            if(checkEmailResult.length != 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X)
                });
                return ;
            }
            
            const checkNickQuery = `SELECT nickname FROM user WHERE nickname = ?`;
            const checkNickResult = await db.queryParam_Parse(checkNickQuery, [nickname]);

            if(checkNickResult.length != 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X)
                });
                return ;
            }
            
            const field =  `name, password, salt, nickname, email, age, sex, phone`;
            //${name}','${password}','${salt}','${nickname}','${email}','${age}','${sex},'${phone}'
            const question = `?,?,?,?,?,?,?,?`;
            const values = [name, password, salt, nickname, email, age, sex, phone];
            const query = `INSERT INTO ${table} (${field}) VALUES(${question}) `;
    
            const result = await db.queryParam_Parse(query,values);
    
            if(!result || result.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.SIGNUP_FAIL)
                });
                return ;
            }
            
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.SIGNUP_SUCCESS)
            })
        });
        
        
   },
    task_update:() => {
        
    },
    ability_update:() => {

    },
    login:()=>{

    }
};
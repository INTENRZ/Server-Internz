var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const crypto = require('crypto');
const encrypt = require('../../module/encryption');
//router-> [PUT]/user/signup2/:userIdx
router.post('/', async (req, res) => {
    try {
        const userIdx = req.params.userIdx;
        const {
            email,
            password,
            phone,
            name,
            nickname,
            age,
            sex
        } = req.body;
        if (!email || !password || !phone || !name || !nickname || !age || !sex) {
            res.status(statusCode.OK)
                .send(util.successFalse(statusCode.MORE_VALUE_NEED, resMessage.NULL_VALUE));

            return;
        }

        encrypt.encrypt(password)
            .then(({
                hashed,
                salt
            }) => User.create2({
                email,
                password: hashed,
                salt,
                phone,
                name,
                nickname,
                age,
                sex
            }))
            .then(({
                code,
                json
            }) => res.status(code).send(json))
            .catch(err => {
                console.log(err);
                res.status(statusCode.INTERNAL_SERVER_ERROR,
                    util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR))
            });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
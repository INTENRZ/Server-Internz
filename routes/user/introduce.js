var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');
const authUtils = require('../../module/authUtils');
const multer = require('multer');
const upload = require('../../config/multer');
router.use('/', authUtils.isLoggedin);
//router-> [PUT]/user/ability
router.put('/', upload.single('front_image'), async (req, res) => {
    try {

        const userIdx = req.decoded.idx; //토큰에서 idx가져오기

        

        const {
            introduce
        } = req.body;
       

        if (req.file == undefined) {
            if (!introduce) {
                res.status(statusCode.OK)
                    .send(util.successFalse(resMessage.NULL_VALUE));

                return;
            }
            if (introduce.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.X_CREATE_FAIL("한 줄 소개"))
                });
                return;
            }
            User.intro_update({
                    userIdx,
                    introduce
                })
                .then(({
                    code,
                    json
                }) => res.status(code).send(json))
                .catch(err => {
                    console.log(err);
                    res.status(statusCode.INTERNAL_SERVER_ERROR,
                        util.successFalse(resMessage.INTERNAL_SERVER_ERROR))
                });

        } else {

            const front_image = req.file.location;
            if (!introduce) {
                res.status(statusCode.OK)
                    .send(util.successFalse(resMessage.NULL_VALUE));

                return;
            }
            if (introduce.length == 0) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.X_CREATE_FAIL("한 줄 소개"))
                });
                return;
            }
            User.intro_update({
                    userIdx,
                    introduce,
                    front_image
                })
                .then(({
                    code,
                    json
                }) => res.status(code).send(json))
                .catch(err => {
                    console.log(err);
                    res.status(statusCode.INTERNAL_SERVER_ERROR,
                        util.successFalse(resMessage.INTERNAL_SERVER_ERROR))
                });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
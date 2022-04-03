/**
 * @description user controller
 * @author 前端小菜鸟吖
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
  * 用户名是否存在
  * @param {string} username 用户名
  */
async function isExist(username) {
    const userInfo = await getUserInfo(username)
    if (userInfo) {
    //已存在
        return new SuccessModel(userInfo)
    } else {
    //不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
  * 注册
  * @param {string} username 用户名
  * @param {string} password 密码
  * @param {number} gender 性别(1 男 ,2 女孩,3 保密)
  */
async function register({ username, password, gender }) {
    const userInfo = await getUserInfo(username)
    if (userInfo) {
    //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            username,
            password: doCrypto(password),
            gender,
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register,
}
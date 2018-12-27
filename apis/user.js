/**
 * 用户相关 登录注册等接口
 */
import { BASE_URL, get, post } from './request.js'

module.exports = {
    // 登录 
    doLogin: function(Account, Pass) {
        return post(`${BASE_URL}/Member/GetEntityLogin`, {
            Account: Account,
            Pass: Pass
        })
    },


    // 验证手机号是否注册
    verifyMobile: function(tel) {
        return get(`${BASE_URL}/Member/TelUnique?tel=${tel}`)
    },


    // 获取验证码
    getVerifyCode: function(mobile, validCode, time) {
        return get(`${BASE_URL}/Member/GetSendValidMsg?phone=${mobile}&validCode=${validCode}&time=${time}&sendType=1`)
    }

}
import Promise from './utils/es6-promise'
import promisePolyfill from './utils/promise-polyfill' // 添加 promise.finally
import {
  initTipSettings
} from './utils/tip' // 使用帮助
import EventEmitter from './utils/event' // 事件总线
import {
  autoLogin,
  getUID
} from './utils/permission'

// fundebug 错误监控
var fundebug = require('./utils/fundebug.0.5.0.min.js')
fundebug.apikey = '这里要填写成你的key'
fundebug.setSystemInfo = true
fundebug.releaseStage = 'production'

App({

  /**
   * 全局事件总线
   */
  event: new EventEmitter(),

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 自动登录
    autoLogin()

    // 初始化帮助信息
    initTipSettings()
  },

  /**
   * 获取用户信息
   * @return {Promise}
   */
  getUserInfo: function() {
    // let uid = getUID()
    // if (!uid) {
    //     return Promise.reject(new Error('未登录'))
    // }
    // 已经有用户信息时直接返回
    if (USER_INFO.Code) {
      return Promise.resolve(USER_INFO)
    } else {
      return Promise.reject(new Error('未登录'))
    }
    // return getUserInfoById(uid).then(res => {
    //   this.setUserInfo(res.data)
    //   return res.data
    // })
  },

  /**
   * 设置用户信息
   * @event <userInfoChanged> 在个人信息页(personal-information)被监听
   */
  setUserInfo: function(userInfo) {
    USER_INFO = Object.assign({}, USER_INFO, userInfo)
    this.event.emit('userInfoChanged', {
      userInfo: userInfo
    })
  }

  
})

/**
 * 用户完整信息，只能通过getter和setter访问和修改
 */
var USER_INFO = {
  "Code": "5453833496877156818",
  "MemberNo": "",
  "MemberName": "zyf",
  "MemberType": 1,
  "MemberStatus": 1,
  "Source": "",
  "Telphone": "18602136255",
  "IDNumber": "",
  "BirthDay": null,
  "Email": "",
  "OpenID": null,
  "NickName": null,
  "HeadImg": null,
  "LoginPwd": "",
  "PictureUrl": "",
  "Remarks": "",
  "IsLeave": false,
  "StartDate": null,
  "EndDate": null,
  "EnName": "",
  "Sex": "M",
  "Nationality": "",
  "BloodType": "",
  "EduGrade": "",
  "Hobby": null,
  "CompanyJob": "",
  "CarNo": "",
  "ContactNo": "",
  "EmergencyContact": "",
  "EmergencyNo": "",
  "IntroduceCode": "",
  "IntroduceNo": "",
  "IntroduceName": "",
  "Receiver": "",
  "Adviser": "",
  "MaritalStatus": null,
  "MainMemNo": null,
  "IsHide": false,
  "InsuranceType": "",
  "CreateBranch": "4948393389077572540",
  "CreateBy": "5405042877049440799",
  "CreateDate": "2018-11-19 16:22:53",
  "UpdateBy": "5405042877049440799",
  "UpdateDate": "2018-11-21 15:28:31",
  "AuditBy": null,
  "AuditDate": null,
  "AuditStatus": null,
  "FromCountry": null,
  "FromCity": null,
  "FromZone": null,
  "IsCredit": null,
  "CreditQuota": null,
  "PostToWhere": null,
  "MemRemarks": "",
  "RemindType": null,
  "RemindWorkShop": "",
  "RemindContent": "",
  "WeChatID": null,
  "FamilyAddress": "",
  "Points": null,
  "ThirdUid": null,
  "QrCode": "M201811220510739954",
  "QrCodeUrl": "",
  "CompanyName": "",
  "CompanyTel": null,
  "CompanyBadgePic": null
}
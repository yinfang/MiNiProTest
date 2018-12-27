// pages/login/login.js
import {
    doLogin,
    verifyMobile,
    getVerifyCode
} from '../../../apis/user.js'
import {
    checkPhone
} from '../../../utils/validator.js'
import {
    login
} from '../../../utils/permission.js'
import {
    getRandom
} from '../../../utils/utils.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeIndex: 0,
        username: '',
        password: '', //输入的密码 验证码
        timeText: '获取验证码',
        yzmSendTime: '', //读取验证码时间
        yzmWriteTime: '', //提交验证码时间
        deadline: 120, //定义短信过期时间
        yzmInfo: '', //接口返回的验证码
        tabs: [{
            title: "密码登录"
        }, {
            title: "验证码登录"
        }]
    },
    changeLogin: function(e) {
        this.setData({
            activeIndex: e.currentTarget.id
        });
    },
    mobileInput: function(e) {
        var phone = e.detail.value;
        this.setData({
            username: e.detail.value
        })
    },
    passInput: function(e) {
        this.setData({
            password: e.detail.value
        })
    },
    getYZM: function() {
        if (this.data.username != '' && this.data.username != null) {
            if (!checkPhone(this.data.username)) {
                wx.showModal({
                    content: '无效手机号！',
                    showCancel: false
                })
                return
            } else {
                verifyMobile(this.data.username).then(res => {
                    if (res.data.ApiStatus == 1) {
                        wx.showModal({
                            content: '手机号未注册',
                            showCancel: false
                        })
                        return
                    } else {
                        this.timeCount()
                        getVerifyCode(this.data.username, getRandom(6, false), this.data.deadline)
                            .then(res => {
                                wx.showModal({
                                    content: res.data.Msg,
                                    showCancel: false
                                })
                                this.setData({
                                    yzmSendTime: new Date(),
                                    yzmInfo: res.data.Data
                                })

                            })
                    }
                })
            }
        } else {
            wx.showModal({
                content: '请输入手机号！',
                showCancel: false
            })
        }
    },
    /*获取验证码计时*/
    timeCount: function() {
        var _this = this
        var coden = 60
        var codeV = setInterval(function() {
            _this.setData({
                timeText: '重新获取' + (--coden) + 's'
            })
            if (coden < 0) {
                clearInterval(codeV)
                _this.setData({
                    timeText: '获取验证码',
                })
                return
            }
        }, 1000)
    },
    doLogin: function() {

        //验证手机号
        if (this.data.username != '' && this.data.username != null && this.data.password != '' && this.data.password != null) {
            if (!checkPhone(this.data.username)) {
                wx.showModal({
                    content: '无效手机号！',
                    showCancel: false
                })
                return
            }
        } else {
            wx.showModal({
                content: this.data.activeIndex == 0 ? '手机号或密码不能为空' : '手机号或验证码不能为空',
                showCancel: false
            })
            return
        }
        if (this.data.activeIndex == 1) { //验证码登录
            if (this.data.password !== this.data.yzmInfo) {
                wx.showModal({
                    content: '验证码不正确！',
                    showCancel: false
                })
                return
            }
        }
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        doLogin(this.data.username, this.data.password).then(res => {
            if (!login(res.data.Data)) {
                return Promise.reject(new Error('设置登录态失败'))
            }
            wx.redirectTo({
                url: '../index/index'
            })
        }).catch(res => {
            wx.showToast({
                title: res.data.Msg,
                showCancel: false
            })
        }).finally(() => {
            wx.hideToast()
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

})
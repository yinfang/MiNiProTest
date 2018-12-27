// pages/me-center/me-center.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courses: [{
            count: 0,
            title: "私教完成课程"
        }, {
            count: 0,
            title: "私教待上课程"
        }, {
            count: 0,
            title: "出勤天数"
        }],
        navigators: [{
            url: '../center/children/my-buy',
            img: '../../images/center_purse.png',
            title: "我的购买"
        }, {
            url: '../center/children/my-booking',
            img: '../../images/center_booking.png',
            title: "ECharts"
        }, {
            url: '../center/children/my-info',
            img: '../../images/center_info.png',
            title: "我的信息"
        }, {
            url: '../center/children/my-bodytest',
            img: '../../images/center_bodytest.png',
            title: "wx-charts"
        }, {
            url: '../center/children/my-contract',
            img: '../../images/center_contract.png',
            title: "我的合同"
        }, {
            url: '../center/children/my-setting',
            img: '../../images/center_setting.png',
            title: "安全设置"
        }]

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

    }
})
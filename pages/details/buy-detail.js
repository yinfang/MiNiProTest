// pages/center/children/children/buy-detail.js
import {
    getOrderDetail
} from "../../apis/details"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: {
            book: {},
            library: {}
        },
        noData: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const code = options.code
        this.getDatail(code);
    },
    getDatail: function(code) {
        getOrderDetail(code).then(res => {
            this.setData({
                order: res.data,
                noData: false
            })
        })
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
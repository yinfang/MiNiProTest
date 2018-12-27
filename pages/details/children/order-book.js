// pages/details/children/order-book.js
import {
    orderBook
} from "../../../apis/details"
import { formatDate, dateAdd } from "../../../utils/utils.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageStatus: 'loading',
        book: {},
        librarys: [],
        showPopup: false,
        startDate: formatDate(new Date()), // 订单开始日期：当前日期
        lastestDate: formatDate(dateAdd('M', 1, new Date())), // 订单最晚取书日期：一个月后
        appointedDate: formatDate(new Date()), // 预约取书日期
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: '../../../images/location.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const id = options.library_id
        this._orderBook(id)

    },
    _orderBook: function(id) {
        orderBook(id).then(res =>
            this.setData({
                pageStatus: 'done',
                book: res.data.book,
                librarys: res.data.collections
            })
        ).catch(() =>
            this.setData({
                pageStatus: 'error'
            })
        )
    },
    onReloadPage: function() {
        this._orderBook()
    },
    /**
     * 查看地图定位
     */
    toSeeMap: function() {
        this.setData({
            showPopup: true
        })
    },
    bindDateChange: function(e) {
        this.setData({
            appointedDate: e.detail.value
        })
    },

    onHidePopup: function() {
        this.setData({
            showPopup: false
        })
    },
    submitOrder: function() {

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
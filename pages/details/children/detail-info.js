// pages/center/children/children/detail-info.js
import {
    getBookInfo,
    getCollections
} from "../../../apis/details"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: {
            relevant_books: {}, //相关图书
            relevant_booklists: {} //包含此书的书单
        },
        libraryList: [],
        foots: [{
            title: "加入书单",
            icon: "/images/icon_add.png",
            url: "../children/add-book"
        }, {
            title: "查看书评",
            icon: "/images/icon_review.png",
            url: "../children/see-comment"
        }],
        noData: true,
        showPopup: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBook()
        this.getCollections()
    },
    /**
     * 图书及相关图书信息
     */
    getBook: function() {
        return getBookInfo().then(res => {
            this.setData({
                bookList: res.data,
                noData: false
            })
        }).catch(res => {
            return Promise.reject(new Error('图书不存在'))
        })
    },
    /**
     * 馆藏信息
     */
    getCollections: function() {
        return getCollections().then(res => {
            this.setData({
                libraryList: res.data.collections
            })
        }).catch(res => {
            return Promise.reject(new Error('无馆藏信息'))
        })
    },
    /**
     * 查看馆藏pop
     */
    onShowPopup: function() {
        this.setData({
            showPopup: true
        })
    },
    /**
     * 隐藏馆藏pop
     */
    onHidePopup: function() {
        this.setData({
            showPopup: false
        })
    },
    /**
     * 查看大图 
     */
    onPreview: function() {
        let img = this.data.bookList.imgs.small
        wx.previewImage({
            current: img,
            urls: [img]
        })
    },
    showToast: function() {
        wx.showModal({
            title: '疑问解答',
            content: '请访问https://www.wxmini.com',
            showCancel: false
        })
    },
    /**
     * 订阅此书
     */
    orderBook: function() {
        this.setData({
            showPopup: true
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
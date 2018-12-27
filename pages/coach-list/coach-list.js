// pages/coach-list/coach-list.js
import { getCoachlist } from '../../apis/coach'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lists: {},
        seach: {
            coachName: '',
            pageSize: 20,
            pageIndex: 1
        }
    },

    onSearch: function(e) {
        this._fetchData()
    },

    onLoad: function(options) {
        wx.showNavigationBarLoading()
        this._fetchData().finally(() => wx.hideNavigationBarLoading())
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this._fetchData()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this._fetchData().finally(() => wx.stopPullDownRefresh())
    },

    _fetchData: function() {
        return getCoachlist(this.data.seach.coachName, this.data.seach.pageIndex, this.data.seach.pageSize).then(res => {
            this.setData({
                lists: res.data.Data,
                seach: {
                    pageIndex: pageIndex++
                }
            })
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
// pages/details/children/add-to-booklist.js
import {
  updateBooklistById
} from "../../../apis/details.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionList: ["我的收藏集", "经典好书"],
    selectedIndex: 0,
    texts: ''
  },
  onSelect: function(e) {
    this.setData({
      selectedIndex: e.detail.value
    })
  },
  onInput: function(e) {
    this.setData({
      texts: e.detail.value
    })
  },
  confirm: function() {
    let comment = this.data
    updateBooklistById(88, {
      add_items: [{
        book_id: 96,
        comment
      }]
    }).then(res => {
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(()=>wx.navigateBack(), 2000)
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

  }
})
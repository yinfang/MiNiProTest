// pages/league-list/league-list.js
import {
  getFreeCourseList,
  getGroupCourseList
} from '../../apis/league'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    tabs: ["小团体课",
      "免费团课"
    ],
    freeList: {},
    groupList: {},
    freePram: {
      CreateBranch: '',
      planDate: '',
      memCode: ''
    },
    groupPram: {
      pageSize: 20,
      pageIndex: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let index = options.index
    var userInfo = app.getUserInfo()
    this.setData({
      tabIndex: index,
      "freePram.CreateBranch": userInfo.CreateBranch,
      "freePram.planDate": new Date(),
      "freePram.memCode": userInfo.MemberCode
    })
    this.getList()
  },
  tabClick: function(e) {
    this.setData({
      tabIndex: e.currentTarget.id
    })
    this.getList()
  },
  goDetail: function(item) {
    wx.navigateTo({
      url: `../league-list/children/league-detail?item==${item.code}`
    })
  },
  /**
   *团课列表 
   */
  getList: function() {
    if (this.data.tabIndex == 0) { //小团体课
      getGroupCourseList(this.data.groupPram.pageSize, this.data.groupPram.pageIndex)
      .then(res => {
        this.setData({
          groupList: res.data.Data
        })
      })
    } else { //免费团课
      getFreeCourseList(this.data.freePram.CreateBranch, this.data.freePram.planDate, this.data.freePram.memCode).then(res => {
        this.setData({
          freeList: res.data.Data
        })
      })
    }
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
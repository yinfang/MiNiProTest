// pages/center/children/my-buy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["团课购买", "私教购买"],
        tabIndex: 0,
        lists: []
    },
    tabClick: function(e) {
        this.setData({
            tabIndex: e.currentTarget.id,
            lists: []
        })
        if (this.data.tabIndex == 0) {
            this.testData(0);
        } else {
            this.testData(30);
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.testData(0);
    },
    testData: function(n) {
        let all = [];
        for (var i = n; i < 50; i++) {
            const item = {
                code: 0,
                states: 0,
                courseName: '',
                coachName: '',
                price: 0
            };
            item.code = "000" + i;
            if (i % 2 == 0) {
                item.states = 0;
            } else {
                item.states = 1;
            }
            item.courseName = "**的瑜伽课" + i;
            item.coachName = "zyf";
            item.price = 0.03;
            all.push(item);
        }
        this.setData({
            lists: Object.assign({}, all)
        })
    },
    goDetail: function(e) {
        wx.navigateTo({
            url: `../../details/buy-detail?code=67`,
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
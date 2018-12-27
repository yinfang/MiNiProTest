//index.js
//获取应用实例
var app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        titles: [{
                title: "私教",
                des: "PT",
                page: "coach-list"
            },
            {
                title: "团课",
                des: "CLASSES",
                page: "league-list",
                index: 1
            },
            {
                title: "小团体课",
                des: "APPOINTMENT",
                page: "league-list",
                index: 0
            },
            {
                title: "个人中心",
                des: "ME",
                page: "center"
            }
        ]
    },

    onLoad: function() {
        this.setData({
            userInfo: app.getUserInfo,
            hasUserInfo: true
        })
    }

})
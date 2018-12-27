// pages/details/children/see-comment.js
import {
    getCommentList
} from "../../../apis/details"
import {
    showTip
} from "../../../utils/tip"
var toast
var toptip
var once = false // 帮助消息只提醒一次
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentList: [],
        start: 0,
        loadMoreStatus: 'hidding',
        popup: {
            show: false,
            score: 0, // 评分
            content: '', // 评论文本
            label: [
                '点击星星评分', '很差', '很差', '较差', '较差',
                '还行', '还行', '推荐', '推荐', '力荐', '力荐'
            ],
            loading: false // 按钮加载状态
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this._getCommentList()
    },
    _getCommentList() {
        getCommentList(this.data.start).then(res => {
            this.setData({
                commentList: res.data.reviews,
                start: this.data.start += 10,
                pageState: 'done'
            })
        }).catch(() => {
            this.setData({
                pageState: 'error'
            })
        })
    },
    doDelete: function() {
        wx.showModal({
            title: '确认删除？',
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    toast.show('即将删除...')
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    /**
     * 点击<page-empty>模板的操作按钮
     */
    onTapPageEmptyBtn: function() {
        this.onShowPopup()
    },
    writeComment: function() {
        this.onShowPopup()
    },
    onInput: function(e) {
        this.setData({
            'popup.content': e.detail.value
        })
    },
    onChange: function(e) {
        this.setData({
            'popup.score': e.detail.value
        })
    },
    onShowPopup: function() {
        this.setData({
            'popup.show': true
        })
        if (!once) {
            once = true
            showTip('ADD_REVIEW')
        }
    },

    onHidePopup: function() {
        this.setData({
            'popup.show': false
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        toast = this.selectComponent('#toast')
        toptip = this.selectComponent('#toptip')
    },
    onSubmit: function() {
        let { score, content, loading } = this.data.popup
        if (loading) return
        if (!score) {
            toptip.show("请点击星星评分")
            return
        }
        if (!content) {
            toptip.show("请输入评论内容")
            return
        }
        this.setData({ 'popup.loading': true })

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
        let {
            start,
            commentList,
            loadMoreStatus
        } = this.data
        if (loadMoreStatus !== 'hidding') return
        getCommentList(this.data.start).then(res => {
            if (res.data.reviews.length) {
                this.setData({
                    commentList: commentList.concat(res.data.reviews),
                    start: start += 10,
                    loadMoreStatus: 'hidding'
                })
            } else {
                this.setData({
                    loadMoreStatus: 'nomore'
                })
            }
        }).catch(() => {
            this.setData({
                pageState: 'error',
                loadMoreStatus: 'hidding'
            })
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
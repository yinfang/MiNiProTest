/**
 * 详情相关接口
 */
import {
    BASE_HTTPS_URL,
    get,
    post
} from './request.js'

module.exports = {
    // 订单详情
    getOrderDetail: function(code) {
        return get(`${BASE_HTTPS_URL}orders/${code}`)
    },
    //图书及相关图书信息 
    getBookInfo: function() {
        return get(`${BASE_HTTPS_URL}books/93`)
    },
    //馆藏信息
    getCollections: function() {
        return get(`${BASE_HTTPS_URL}books/93/collections`)
    },
    //确认借书
    orderBook: function(library_id) {
        return get(`${BASE_HTTPS_URL}books/${library_id}/collections`)
    },
    //搜索图书馆
    searchLibrary: function(start) {
        return get(`${BASE_HTTPS_URL}books/${start}/collections`)
    },
    //加入书单后更新列表
    updateBooklistById: function(id, params) {
        return post(`${BASE_HTTPS_URL}booklists/${id}`, params)
    },
    //获取评论列表
    getCommentList: function(start) {
        return get(`${BASE_HTTPS_URL}books/90/reviews?start = ${start}`)
    }
}
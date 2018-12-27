/**
 * 团课相关接口
 */
import {
    BASE_URL,
    get,
    post
} from './request.js'

module.exports = {
    // 免费团课列表 参数：分店branchCode，预约时间planDate，会员MemberCode
    getFreeCourseList: function(CreateBranch, planDate, memCode) {
        return post(`${BASE_URL}GroupCourse/GetGroupCourseList`, {
            branchCode: CreateBranch,
            planDate: planDate,
            memCode: memCode
        })
    },
    // 小团体课列表 
    getGroupCourseList: function(pageSize, pageIndex) {
        return get(`${BASE_URL}MallGoods/GetGroupCourseGoodsEntityListByPaging?pageSize=${pageSize}&pageIndex=${pageIndex}`)
    }

}
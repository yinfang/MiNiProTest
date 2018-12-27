/**
 * 私教相关接口
 */
import { BASE_URL, get, post } from './request.js'

module.exports = {
    // 私教列表 
    getCoachlist: function(coachName, pageSize, pageIndex) {
        return get(`${BASE_URL}/MallGoods/GetPTcoachList?coachName=${coachName}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
    }


}
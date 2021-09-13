// 引入刚刚封装的request
import request from '../utils/request'
const group_name = 'info'
let data = {
    getInfoList(pageNumber) {
        return new request({
            url: `/${group_name}/getInfo?pageNumber=`+pageNumber,
            method: 'post'
        })
    },
    getInfoById(id){
        return new request({
            url: `/${group_name}/getInfoById?id=`+id,
            method: 'post'
        })
    },
    addInof(info){
        return new request({
            url:`/${group_name}/addInfo`,
            data:info,
            method:'post'
        })
    },
    getInfoListByCondition(info){
        return new request({
            url:`/${group_name}/getInfoListByCondition`,
            data:info,
            method:'post'
        })
    },
    deleteInfoById(id){
        return new request({
            url:`/${group_name}/deleteInfo?id=`+id,
            method:'post'
        })
    },
    batchDeleteInfo(ids){
        return new request({
            url:`/${group_name}/batchDeleteInfo?ids=`+ids,
            method:'post'
        })
    },
    getRecentInfo(){
        return new request({
            url:`${group_name}/getRecentInfo`,
            method:'post'
        })
    }
}
export default data
// 引入刚刚封装的request
import request from '../utils/request'
const group_name = 'answer'
let data = {
    addAnswer(answer) {
        return new request({
            url:`/${group_name}/addAnswer`,
            data:answer,
            method: 'post'
        })
    },
    findProAnswer(pageNumber){
        return new request({
            url:`/${group_name}/findProAnswer?pageNumber=`+pageNumber,
            method:'post'
        })
    }
}
export default data
// 引入刚刚封装的request
import request from '../utils/request'
const group_name = 'problem'
let data = {
    getProblemList(pageNumber) {
        return new request({
            url:`/${group_name}/getProblem?pageNumber=`+pageNumber,
            method: 'post'
        })
    },
}
export default data
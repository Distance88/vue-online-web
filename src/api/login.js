// 引入刚刚封装的request
import request from '../utils/request'
const group_name = 'student'
let data = {
    login(student) {
        return new request({
            url: `/${group_name}/login`,
            data:student,
            method: 'post'
        })
    },
}
export default data
// 引入刚刚封装的request
import request from '../utils/request'
const group_name = 'examAnswer'
let data = {
    addExamAnswer(examAnswerList) {
        return new request({
            url:`/${group_name}/addExamAnswer`,
            data:examAnswerList,
            method: 'post'
        })
    },
}
export default data
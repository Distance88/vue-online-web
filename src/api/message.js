// 引入刚刚封装的request
import request from '../utils/request'
const group_name = 'message'
let data = {
    getMessageList(){
        return new request({
            url: `/${group_name}/getMessageList`,
            method: 'post'
        })
    },
    addMessage(message){
        return new request({
            url:`/${group_name}/addMessage`,
            data:message,
            method:'post'
        })
    }
    
}
export default data
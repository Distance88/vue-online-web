import request from '../utils/request'
const group_name = 'type'
let data={
    getType(){
        return new request({
            url:`${group_name}/getType`,
            method:'post'
        })
    }
}
export default data
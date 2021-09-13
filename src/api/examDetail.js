
import request from '../utils/request'
const group_name = 'examDetail'
let data = {

    getExamDetailById(id){
        return new request({
            url:`/${group_name}/getExamDetailById?id=`+id,
            method:'post'
        })
    }
}
export default data
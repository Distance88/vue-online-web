import request from '../utils/request'
const group_name = 'exam'
let data = {
    findExamByCondition(exam){
        return new request({
            url:`${group_name}/findExamByCondition`,
            data:exam,
            method:'post'
        })
    },
    findExamInfoById(id){
        return new request({
            url:`${group_name}/findExamById?id=`+id,
            method:"post"
        })
    }
}
export default data
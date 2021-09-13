import request from '../utils/request'
const group_name = 'member'
let data = {
    getmemberList(pageNumber){
        return new request({
            url:`${group_name}/getmemberList?pageNumber=`+pageNumber,
            method:'post'
        })
    },
    getmemberListByCondition(member){
        return new request({
            url:`${group_name}/getmemberListByCondition`,
            data:member,
            method:'post'
        })
    },
    exportMemberExcel(){
        return new request({
            url:`${group_name}/exportMemberExcel`,
            method:'post'
        })
    }
}
export default data
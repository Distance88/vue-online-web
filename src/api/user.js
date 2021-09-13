import request from '../utils/request'
const group_name = 'user'
let data = {
    changeUserInfoByUserId(userInfo){
        return new request({
            url:`${group_name}/changeUserInfoByUserId`,
            data:userInfo,
            method:'post'
        })
    },
    changePhoto(formData){
        return new request({
            url:`${group_name}/changePhoto`,
            data:formData,
            method:'post',
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}
export default data
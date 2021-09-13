
import request from '../utils/request'
const group_name = 'examReview'
let data = {

    getExamReviewByCondition(params){
        return new request({
            url:`/${group_name}/getExamReviewByCondition`,
            data:params,
            method:'post'
        })
    },
    reviewById(examReview) {
        return new request({
            url:`/${group_name}/reviewById`,
            data:examReview,
            method:'post'
        })
    }
}
export default data
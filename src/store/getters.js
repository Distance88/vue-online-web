const getters = {
    exam: state => state.exam.exam,
    questionIndex: state => state.question.questionIndex,
    questionList: state => state.question.questionList,
    examAnswer:state =>state.examAnswer.examAnswer,
    student:state => state.student.student
}
export default getters

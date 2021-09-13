const state = {
    exam: {
        id:'',
        grade:'',
        subject:'',
        title:'',
        singleQuestionList:[],
        fillQuestionList:[],
        solveQuestionList:[],
        fillAnswer:[],
        questionCount:0,
        score:0,
        time:0,
        answerCount:0
    }
  }
  
  const mutations = {
    SET_EXAM_GRADE: (state, grade) => {
        state.exam.grade = grade
    },
    SET_EXAM_SUBJECT: (state, subject) => {
        state.exam.subject = subject
    },
    SET_EXAM_TITLE: (state,title) => {
        state.exam.title = title
    },
    SET_SINGLEQUESTION_ANSWER:(state,parms) =>{
        state.exam.singleQuestionList[parms.index].answer = parms.answer
    },
    SET_FILLQUESTION_ANSWER:(state,parms) =>{
        console.log(parms)
        state.exam.fillQuestionList[parms.index].answer = parms.answer
    },
    SET_SOLVEQUESTION_ANSWER:(state,parms) =>{
        console.log(parms)
        state.exam.solveQuestionList[parms.index].answer = parms.answer
    },
    ADD_ANSWER_COUNT: (state) => {
        state.exam.answerCount+=1
    },
    DEL_ANSWER_COUNT: (state) => {
        state.exam.answerCount-=1
    },
    ADD_SINGLEQUESTION: (state,singleQuestion) => {
        state.exam.singleQuestionList.push(singleQuestion)
    },
    DEL_SINGLEQUESTION: (state,index) => {
        state.exam.singleQuestionList.splice(index,1)
    },
    ADD_FILLQUESTION: (state,fillQuestion) => {
        state.exam.fillQuestionList.push(fillQuestion)
    },
    ADD_SOLVEQUESTION: (state,solveQuestion) => {
        state.exam.solveQuestionList.push(solveQuestion)
    },
    SET_EXAM_QUESTION_COUNT: (state) => {
        state.exam.questionCount += 1
    },
    SUB_EXAM_QUESTION_COUNT: (state) => {
        state.exam.questionCount -= 1
    },
    SET_EXAM_SCORE: (state, score) => {
        state.exam.score += score
    },
    SUB_EXAM_SCORE: (state, score) => {
        state.exam.score -= score
    },
    SET_EXAM_TIME: (state, time) => {
        state.exam.time = time
    },
    SET_EXAM:(state,exam) => {
        state.exam = exam
        state.exam.answerCount = 0
    },
    CLEAR_EXAM: (state) => {
      state.exam = {
            grade:'',
            subject:'',
            title:'',
            type:'',
            singleQuestionList:[],
            fillQuestionList:[],
            solveQuestionList:[],
            questionCount:0,
            score:0,
            time:30
        }
    }
  }
  
  const actions = {
    setExamGrade({ commit }, grade) {
      commit('SET_EXAM_GRADE', grade)
    },
    setExamSubject({ commit }, subject) {
        commit('SET_EXAM_SUBJECT', subject)
    },
    setExamTitle({ commit }, title) {
        commit('SET_EXAM_TITLE', title)
    },
    setExamType({ commit }, type) {
        commit('SET_EXAM_TYPE', type)
    },
    setSingleQuestionAnswer({commit},parms){
        commit('SET_SINGLEQUESTION_ANSWER',parms)
    },
    setFillQuestionAnswer({commit},parms){
        commit('SET_FILLQUESTION_ANSWER',parms)
    },
    setSolveQuestionAnswer({commit},parms){
        commit('SET_SOLVEQUESTION_ANSWER',parms)
    },
    addAnswerCount({ commit }) {
        commit('ADD_ANSWER_COUNT')
    },
    delAnswerCount({ commit }) {
        commit('DEL_ANSWER_COUNT')
    },
    addSingleQuestion({ commit }, singleQuestion) {
        commit('ADD_SINGLEQUESTION', singleQuestion)
    },
    delSingleQuestion({ commit }, singleQuestion) {
        commit('DEL_SINGLEQUESTION', singleQuestion)
    },
    addFillQuestion({ commit }, fillQuestion) {
        commit('ADD_FILLQUESTION', fillQuestion)
    },
    addSolveQuestion({ commit }, solveQuestion) {
        commit('ADD_SOLVEQUESTION', solveQuestion)
    },
    setExamQuestionCount({ commit }) {
        commit('SET_EXAM_QUESTION_COUNT')
    },
    subExamQuestionCount({ commit }) {
        commit('SUB_EXAM_QUESTION_COUNT')
    },
    setExamScore({ commit }, score) {
        commit('SET_EXAM_SCORE', score)
    },
    subExamScore({ commit }, score) {
        commit('SUB_EXAM_SCORE', score)
    },
    setExamTime({ commit }, time) {
        commit('SET_EXAM_TIME', time)
    },
    setExam({commit},exam){
        commit('SET_EXAM',exam)
    },
    clearExam({ commit }) {
        commit('CLEAR_EXAM')
    },

  }
  
  export default {
    state,
    mutations,
    actions
  }
  
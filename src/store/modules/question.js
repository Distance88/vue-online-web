const state = {
    questionList:[],
    questionIndex:0,
  }
  
  const mutations = {
    SET_QUESTION_LIST:(state,questionList) =>{
        state.questionList = questionList
    },
    ADD_QUESTION_INDEX:(state) =>{
      state.questionIndex+=1
    },
    SUB_QUESTION_INDEX:(state) => {
      state.questionIndex-=1
    },
    SET_QUESTION_INDEX:(state,index) =>{
      state.questionIndex = index
    }
  }
  
  const actions = {
    setQuestionList({commit},questionList){
        commit('SET_QUESTION_LIST',questionList)
    },
    addQuestionIndex({commit}){
      commit('ADD_QUESTION_INDEX')
    },
    subQuestionIndex({commit}){
      commit('SUB_QUESTION_INDEX')
    },
    setQuestionIndex({commit},index){
      commit('SET_QUESTION_INDEX',index)
  },
  }
  
  export default {
    state,
    mutations,
    actions
  }
  
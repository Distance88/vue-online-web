const state = {
    examAnswer:[]
  }
  
  const mutations = {
    SET_EXAM_ANSWER_LIST: (state,examAnswerList) => {
      state.examAnswer = examAnswerList
    },
    SET_MY_ANSWER:(state,params) =>{
      state.examAnswer[params.index].myAnswer = params.myAnswer 
    }
  }
  
  const actions = {
    setExamAnswerList({ commit },examAnswerList) {
      commit('SET_EXAM_ANSWER_LIST',examAnswerList)
    },
    setMyAnswer({ commit },params) {
      commit('SET_MY_ANSWER',params)
    },


  }
  
  export default {
    state,
    mutations,
    actions
  }
  
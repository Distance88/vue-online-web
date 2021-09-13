const state = {
    student:{}
  }
  
  const mutations = {
    SET_STUDENT: (state, student) => {
       state.student = student
    },
  }
  
  const actions = {
    setStudent({ commit }, student) {
      commit('SET_STUDENT', student)
    },

  }
  
  export default {
    state,
    mutations,
    actions
  }
  
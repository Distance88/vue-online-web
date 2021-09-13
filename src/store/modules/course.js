const state = {
    courseList: [
        {
            id:'七年级',
            label:'七年级',
            children:[
                {
                    id:'语文',
                    label:'语文',
                },
                {
                    id:'数学',
                    label:'数学',
                },
                {
                    id:'英语',
                    label:'英语',
                },
                {
                    id:'生物',
                    label:'生物',
                },
                {
                    id:'地理',
                    label:'地理',
                },
                {
                    id:'历史',
                    label:'历史',
                },
                {
                    id:'政治',
                    label:'政治',
                },

            ]
        }
    ]
  }
  
  const mutations = {
    SET_COURSE_LIST: (state, courseList) => {
        state.courseList = courseList
    },
  }
  
  const actions = {
    setcourseList({ commit }, courseList) {
      commit('SET_COURS_LIST', courseList)
    },
  }
  
  export default {
    state,
    mutations,
    actions
  }
  
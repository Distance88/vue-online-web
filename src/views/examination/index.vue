<template>
  <el-container>
    <el-header>
      <my-header @changeVisible="changeVisible"></my-header>
    </el-header>
    <el-container>
      <el-aside v-if="visible" style="width:280px">
        <my-scantron ></my-scantron>
      </el-aside>
      <el-main><my-question :questionList="questionList" ></my-question></el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-header {
  padding: 0;
}
.el-container {
  background-image: url("../../static/images/bg.d47fb98b.png");
  height: 650px;
}
.el-main {
  padding: 5px;
}
</style>
<script>
import myHeader from "./components/Header";
import myScantron from "./components/Scantron";
import myQuestion from "./components/Question";
import examApi from '@api/exam'
import { Message  } from 'element-ui';
export default {
  data() {
    return {
      visible: true,
      questionList:[]
    };
  },
  components: {
    myHeader,
    myScantron,
    myQuestion
  },
  methods: {
    changeVisible() {
      this.visible = !this.visible;
    },
    beforeunloadHandler(e) {
        e = e || window.event;

        if (e) {
         
          e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
        }
        return "您是否确认离开此页面-您输入的数据可能不会被保存";
      },
  },
  mounted () {
    history.pushState(null, null, document.URL); 
    window.addEventListener('popstate', function() { 
      Message.error('不允许回退！')
      history.pushState(null, null, document.URL); 
    });

    window.addEventListener("beforeunload", e => {
      this.beforeunloadHandler(e);
    });
},
destroyed () {
    window.removeEventListener('popstate', this.goBack, false);
    window.removeEventListener("beforeunload", e => {
    this.beforeunloadHandler(e);  
});
},
  created(){
    this.$store.dispatch('setStudent',JSON.parse(sessionStorage.getItem('student')))
    const _this = this;
    examApi.findExamInfoById(_this.$route.params.id).then(req => {
     
       _this.$store.dispatch("setExam", req.data);
      let examAnswerList = []
      for(var i=0;i<req.data.singleQuestionList.length;i++){
        let examAnswer = {
          examId:req.data.id,
          studentId:_this.$store.getters.student.studentid,
          questionId:req.data.singleQuestionList[i].id,
          questionType:'单选题',
          myAnswer:''
        }
        examAnswerList.push(examAnswer)
        _this.questionList.push(req.data.singleQuestionList[i])
      }
      for(var j=0;j<req.data.fillQuestionList.length;j++){
        let examAnswer = {
          examId:req.data.id,
          studentId:_this.$store.getters.student.studentid,
          questionId:req.data.fillQuestionList[j].id,
          questionType:'填空题',
          myAnswer:''
        }
        examAnswerList.push(examAnswer)
        _this.questionList.push(req.data.fillQuestionList[j])
      }
      for(var k=0;k<req.data.solveQuestionList.length;k++){
        let examAnswer = {
          examId:req.data.id,
          studentId:_this.$store.getters.student.studentid,
          questionId:req.data.solveQuestionList[k].id,
          questionType:'应用题',
          myAnswer:''
        }
        examAnswerList.push(examAnswer)
        _this.questionList.push(req.data.solveQuestionList[k])
      }

      _this.$store.dispatch('setQuestionList',_this.questionList)
      _this.$store.dispatch('setExamAnswerList',examAnswerList)
    });

  }
};
</script>
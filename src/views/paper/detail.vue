<template>
  <div class="ui container">
    <div class="my-exam-info">
      <h2 class="ui center aligned header">{{examDetail.examTitle}}</h2>
      <div class="my-exam-createTime">{{examDetail.createTime}}</div>
      <div class="ui three column center aligned grid">
        <div class="column"><strong>学生姓名：</strong>{{examDetail.studentName}}</div>
        <div class="column"><strong>考试时长：</strong>{{examDetail.time}}分钟</div>
        <div class="column"><strong>试卷得分：</strong>{{this.$route.params.score.totalScore}}分</div>
      </div>
    </div>
    <div class="my-exam-list">
      <el-collapse v-model="activeNames">
        <el-collapse-item  name="1">
          <template slot="title"><strong>一、单选题</strong></template>
          <el-card class="box-card" v-for="(singleQuestion,index) in examDetail.singleQuestionList" :key="index">
            <div class="my-question">
              <a class="ui teal circular label">{{index+1}}</a>
              <span>{{singleQuestion.stem}}（{{singleQuestion.score}}分）</span>
            </div> 
            <div class="my-answer-radio">
              <div class="my-result-answer">正确答案: {{singleQuestion.answer}}   学生答案: {{singleQuestion.myAnswer}} 
                <span v-if="singleQuestion.answer != singleQuestion.myAnswer" style="color:#ff6547">（错误）</span>
                <span v-if="singleQuestion.answer === singleQuestion.myAnswer" style="color:#1abc9c">（正确）</span>
              </div>
              <div :class="[
                   'result-answer-item',
                   {
                     'green-answer-item':singleQuestion.answer==='A'
                   },
                   {
                     'orange-answer-item':singleQuestion.answer!=singleQuestion.myAnswer && singleQuestion.myAnswer==='A'}]"> 
                    A.{{singleQuestion.choicea}}
              </div>
               <div :class="[
                   'result-answer-item',
                   {
                     'green-answer-item':singleQuestion.answer==='B'
                   },
                   {
                     'orange-answer-item':singleQuestion.answer!=singleQuestion.myAnswer && singleQuestion.myAnswer==='B'}]"> 
                    B.{{singleQuestion.choiceb}}
              </div>
               <div :class="[
                   'result-answer-item',
                   {
                     'green-answer-item':singleQuestion.answer==='C'
                   },
                   {
                     'orange-answer-item':singleQuestion.answer!=singleQuestion.myAnswer && singleQuestion.myAnswer==='C'}]"> 
                    C.{{singleQuestion.choicec}}
              </div>
               <div :class="[
                   'result-answer-item',
                   {
                     'green-answer-item':singleQuestion.answer==='D'
                   },
                   {
                     'orange-answer-item':singleQuestion.answer!=singleQuestion.myAnswer && singleQuestion.myAnswer==='D'}]"> 
                    D.{{singleQuestion.choiced}}
              </div>
            </div>
          </el-card>
        </el-collapse-item>
        <el-collapse-item  name="2">
          <template slot="title"><strong>二、填空题</strong></template>
          <el-card class="box-card" v-for="(fillQuestion,index) in examDetail.fillQuestionList" :key="index">
            <div class="my-question">
              <a class="ui teal circular label">{{index+1}}</a>
              <span>{{fillQuestion.stem}}（{{fillQuestion.score}}分）</span>
            </div>
            <div class="my-fill-answer">
              <div class="student-fill-answer">考生回答：{{fillQuestion.myAnswer}}</div>
              <div class="student-fill-answer">参考答案：{{fillQuestion.answer}}</div>
              <div class="my-fill-score">给定分值：
                <el-input-number v-model="fillScore[index]" disabled></el-input-number>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
        <el-collapse-item  name="3">
          <template slot="title"><strong>三、应用题</strong></template>
          <el-card class="box-card" v-for="(solveQuestion,index) in examDetail.solveQuestionList" :key="index">
            <div class="my-question">
              <a class="ui teal circular label">{{index+1}}</a>
              <span>{{solveQuestion.stem}}（{{solveQuestion.score}}分）</span>
            </div>
            <div class="my-fill-answer">
              <div class="student-fill-answer">考生回答：{{solveQuestion.myAnswer}}</div>
              <div class="my-fill-score">给定分值：
                <el-input-number  v-model="solveScore[index]" disabled></el-input-number>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
      <el-backtop :bottom="100"></el-backtop>
     
    </div>
  </div>
</template>

<style scoped>
.ui.container {
  width: 100%;
  padding-top: 40px;
}
.my-exam-info {
  padding-bottom: 20px;
}
.my-exam-createTime {
  text-align: center;
  color: rgb(102, 102, 102);
  padding-bottom: 20px;
}
.my-exam-list{
  padding: 20px;
}
.my-question span{
  color: #333;
  margin-left: 5px;
  font-size: 16px;

}
.my-answer-radio{
  padding-top: 10px;
  padding-left: 34px;
}
.el-radio{
  padding: 10px 0;
}
.el-radio span{
  font-size: 16px;
  color: #333;
}
.box-card{
  margin-bottom: 5px;
}
.my-result-answer{
  font-size: 15px;
  color: rgb(102, 102, 102);
  margin: 10px 0;
}
.result-answer-item {
    border-radius: 6px;
    border: 1px solid #d4d4d4;
    padding: 10px;
    background: #fff;
    font-size: 14px;
    margin-bottom: 20px;
}
.green-answer-item {
    border-color: #1abc9c;
}
.orange-answer-item {
    border-color: #ff6547;
}
.student-fill-answer{
  margin-top: 15px;
  font-size: 15px;
}
.my-fill-score{
  margin-top: 15px;
  font-size: 15px;
}
</style>
<script>
import examDetailApi from "@api/examDetail";
export default {
  data() {
    return {
      activeNames: ['1'],
      fillScore:[],
      singleScore:[],
      solveScore:[],
      examDetail:{},
    };
  },
  methods: {
    getExamDetailById(){
        const id = this.$route.params.id
        let fillStrArr = this.$route.params.score.fillScore.split(",")
        this.fillScore=fillStrArr.slice(0,-1).map(item => {
          return +item;
        });
        let solveStrArr = this.$route.params.score.solveScore.split(",")
        this.solveScore=solveStrArr.slice(0,-1).map(item => {  
          return +item;
        }); 

        const _this = this
        examDetailApi.getExamDetailById(id).then(req=>{
        _this.examDetail = req.data

        for(var i=0;i<_this.examDetail.singleQuestionList.length;i++){
          if(_this.examDetail.singleQuestionList[i].answer == _this.examDetail.singleQuestionList[i].myAnswer){
            _this.singleScore[i] = _this.examDetail.singleQuestionList[i].score
          }else{
             _this.singleScore[i] = 0
          }
        }
      })
    },
  },
  mounted(){
    this.getExamDetailById()
  },
  created(){
    
  }
}
</script>
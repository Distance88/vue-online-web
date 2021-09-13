<template>
  <div class="my-scantron">
    <div class="ui container">
      <div class="my-finsh-btn">
        <div class="ui orange button" style="width:235px" @click="finshExam">交卷</div>
      </div>
      <div class="my-count-down">
        <div class="my-timer">
          <i class="icon clock outline" style="float:left"></i>
          <div style="float:left"> 
              <span style="font-size:16px">用时：</span>
              <span style="color:#f06000">{{ minute }}:{{ second }}</span>
          </div>
        </div>
        <div class="my-stop">
            <button class="ui mini labeled icon button" @click="select" style="width:86px !important">
                <i :class="flag === true ? className1 : className2"></i>
                <span style="font-size:10px !important">{{ flag === true ? "暂停" : "开始" }}</span>
            </button>
            <div class="ui page dimmer">
                <div class="content">
                   <img src="@images/rest.png" alt="" />
                </div>
            </div>
        </div>
      </div>
      <div class="my-question-count">
        <span class="my-question-count-text">答题卡</span>
        <span class="my-question-count-count">{{this.$store.getters.exam.answerCount}}/{{this.$store.getters.exam.questionCount}}</span>
      </div>
      <div class="my-answer-desc">
          <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <span class="my-answer-card-title">选择题</span>
                <span class="my-answer-card-desc">(共5题，共20分)</span>
              </template>
              <div class="my-panel-order">
                <div v-for="index in singleQuestionLength" :key="index">
                  <a :class="[{'my-finsh-answer':examAnswer[index-1].myAnswer != ''}]" @click="getQuestionByIndex(index-1)">{{index}}</a>
                </div>
              </div>
            </el-collapse-item>
          <el-collapse-item name="2">
              <template slot="title">
                <span class="my-answer-card-title">填空题</span>
                <span class="my-answer-card-desc">(共5题，共20分)</span>
              </template>
              <div class="my-panel-order">
                <a v-for="index in fillQuestionLength" :key="index"
                :class="[{'my-finsh-answer':examAnswer[index + singleQuestionLength - 1].myAnswer != ''}]"
                @click="getQuestionByIndex(index + singleQuestionLength - 1)">
                {{index+singleQuestionLength}}</a>
              </div>
            </el-collapse-item>
          
             <el-collapse-item name="3">
              <template slot="title">
                <span class="my-answer-card-title">应用题</span>
                <span class="my-answer-card-desc">(共5题，共20分)</span>
              </template>
              <div class="my-panel-order">
                <a v-for="index in solveQuestionLength" :key="index"
                :class="[{'my-finsh-answer':examAnswer[index + singleQuestionLength + fillQuestionLength-1].myAnswer != ''}]"
                @click="getQuestionByIndex(index + singleQuestionLength + fillQuestionLength - 1)">
                {{index + singleQuestionLength + fillQuestionLength}}</a>
              </div>
            </el-collapse-item>
            </el-collapse>
      </div>
      <div class="my-answer-footer">
        <div class="ui center aligned grid" style="width:285px">
            <div class="column" style="padding:0">
                <span>已做<button></button></span>
                <span>未做<button style="background-color:#fff !important"></button></span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style >
.el-collapse-item__content{
  padding-bottom: 13px;
}
.my-finsh-answer{
  background-color: #EFEFEF;
}
</style>
<script>
import $ from "jquery";
import "@css/scantron.css"
import examAnswerApi from '@api/examAnswer'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      second: 0,
      minute: "00",
      timer: 0,
      className1: "pause icon",
      className2: "play icon",
      flag: true,
      activeNames:["1","2","3"],
    };
  },
  computed:{
    singleQuestionLength(){
      return this.$store.getters.exam.singleQuestionList.length
    },
    fillQuestionLength(){
      return this.$store.getters.exam.fillQuestionList.length
    },
    solveQuestionLength(){
      return this.$store.getters.exam.solveQuestionList.length
    },
    examAnswer(){
      return this.$store.getters.examAnswer;
    }
  },
  methods: {
    ...mapActions(['setQuestionIndex']),
    setTimer() {
      this.second++;
      if (this.second >= 60) {
        this.second = 0;
        this.minute++;
        this.minute = this.minute < 10 ? "0" + this.minute : this.minute;
      }

      this.second = this.second < 10 ? "0" + this.second : this.second;
    },
    getQuestionByIndex(index){
      this.$store.dispatch('setQuestionIndex',index)
    },
    start() {
      this.timer = setInterval(this.setTimer, 1000);
    },
    pause() {
      let oldSecond = parseInt(this.second);
      clearInterval(this.timer);
      if (this.flag != true) {
        $(".dimmer").dimmer("show");
      }
      this.second = oldSecond < 10 ? "0" + oldSecond : oldSecond;
    },
    select() {
      this.flag = !this.flag;

      if (this.flag != true) {
        this.pause();
      } else {
        this.start();
      }
    },
    finshExam(){
      let _this = this
      if(this.$store.getters.exam.answerCount < this.$store.getters.exam.questionCount){
         this.$confirm("你还有部分题目未完成，是否立即交卷？", "提示", {
            confirmButtonText: "立即交卷",
            cancelButtonText: "继续做题",
            type: "warning"
        }).then(() => {
          let examAnswerList = this.$store.getters.examAnswer
          examAnswerApi.addExamAnswer(examAnswerList).then(req =>{
             _this.$message({
              message:req.msg,
              type:"success"
            })
          })
          _this.$router.push('/exam')
        }).catch(() => {
          
        });
      }else{
         this.$confirm("此操作将提交试卷，是否提交试卷？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
          let examAnswerList = this.$store.getters.examAnswer
          examAnswerApi.addExamAnswer(examAnswerList).then(req =>{
            _this.$message({
              message:req.msg,
              type:"success"
            })
             _this.$router.push('/exam')
          })
        }).catch(() => {});
      }
    }
  },
  created() {
    this.timer = setInterval(this.setTimer, 1000);
  }
};
</script>
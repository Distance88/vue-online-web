<template>
  <div class="ui container">
    <el-card class="box-card" style="margin-bottom:5px">
      <div class="ui grid">
        <div v-if="questionIndex < singleQuestionLength && questionIndex >= 0" class="twelve wide column"><h5>一、单选题</h5></div>
        <div v-if="questionIndex < fillQuestionLength+singleQuestionLength && questionIndex >= singleQuestionLength" class="twelve wide column"><h5>二、填空题</h5></div>
        <div v-if="questionIndex < solveQuestionLength+singleQuestionLength+fillQuestionLength && questionIndex >= fillQuestionLength+singleQuestionLength" class="twelve wide column"><h5>三、应用题</h5></div>
        <div class="four wide column">
            <i class="el-icon-menu my-icon"></i>全卷共{{this.$store.getters.exam.questionCount}}题
            <i class="el-icon-alarm-clock" style="margin-left:30px"></i>考试时长：{{this.$store.getters.exam.time}}分钟
        </div>
      </div>
    </el-card>
    <el-card class="box-card" style="height:500px">
      <div class="my-question">
        <a class="ui teal circular label">{{questionIndex+1}}</a>
        <span>{{questionList[questionIndex].stem}}</span>
      </div> 
      <div v-if="questionIndex < singleQuestionLength" class="my-answer-radio">
        <div><el-radio v-model="singleAnswer[questionIndex]" label="A" @change="setSingleQuestionAnswer"><span>A.{{questionList[questionIndex].choicea}}</span></el-radio></div>
        <div><el-radio v-model="singleAnswer[questionIndex]" label="B" @change="setSingleQuestionAnswer"><span>B.{{questionList[questionIndex].choiceb}}</span></el-radio></div>
        <div><el-radio v-model="singleAnswer[questionIndex]" label="C" @change="setSingleQuestionAnswer"><span>C.{{questionList[questionIndex].choicec}}</span></el-radio></div>
        <div><el-radio v-model="singleAnswer[questionIndex]" label="D" @change="setSingleQuestionAnswer"><span>D.{{questionList[questionIndex].choiced}}</span></el-radio></div>
      </div>
      <el-input v-if="questionIndex >= singleQuestionLength && questionIndex<(singleQuestionLength + fillQuestionLength)"
        type="textarea"
        placeholder="请输入内容"
        rows="20"
        @change="getFillQuestionAnswer"
        v-model="fillAnswer[questionIndex - singleQuestionLength]">
      </el-input >
       <el-input v-if="questionIndex >= (singleQuestionLength + fillQuestionLength)"
        type="textarea"
        placeholder="请输入内容"
        rows="20"
        @change="getSolveQuestionAnswer"
        v-model="solveAnswer[questionIndex - (singleQuestionLength+fillQuestionLength)]">
      </el-input >
    </el-card>
    <el-card class="box-card" style="margin-top:5px">
        <div class="ui two column center aligned grid">
            <div class="column"><el-link :underline="false" type="primary" @click="prev"><i class="el-icon-arrow-left"></i>上一题</el-link></div>
            <div class="column"><el-link :underline="false" type="primary" @click="next">下一题<i class="el-icon-arrow-right"></i></el-link></div>
        </div>
    </el-card>
  </div>
</template>

<style scoped>
.ui.container{
    width: 100%;
    padding: 5px;
}
.my-icon{
  margin-right: 5px;
}
.my-question{
  margin-bottom: 15px;
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
</style>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      singleAnswer:[],
      fillAnswer:[],
      solveAnswer:[],
      singleQuestionShow:true,
      fillQuestionShow:false
    }
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
    questionList(){
      return this.$store.getters.questionList
    },
    questionIndex(){
      return this.$store.getters.questionIndex
    }
  },
  methods:{
    ...mapActions(['addQuestionIndex'],'subQuestionIndex','addAnswerCount','delAnswerCount','setMyAnswer'),
    prev(){

      if(this.$store.getters.questionIndex == 0){
        return false
      }

      this.$store.dispatch('subQuestionIndex')
    },
    next(){
      
      if(this.$store.getters.questionIndex == this.questionList.length-1){
        return false
      }

      this.$store.dispatch('addQuestionIndex')
    },
    setSingleQuestionAnswer(myAnswer){
      let params = {
        myAnswer:myAnswer,
        index:this.questionIndex
      }
      if(this.$store.getters.examAnswer[this.questionIndex].myAnswer === ''){
        this.$store.dispatch('addAnswerCount')
      }
      this.$store.dispatch('setMyAnswer',params)
    },
    getFillQuestionAnswer(myAnswer){

      
      let params = {
        myAnswer:myAnswer,
        index:this.questionIndex
      }
      if(myAnswer == ''){
        this.$store.dispatch('delAnswerCount')
        this.$store.dispatch('setMyAnswer',params)
        return false
      }
      
      this.$store.dispatch('setMyAnswer',params)
      this.$store.dispatch('addAnswerCount')
    },
    getSolveQuestionAnswer(myAnswer){

      let params = {
        myAnswer:myAnswer,
        index:this.questionIndex
      }
      if(myAnswer == ''){
        this.$store.dispatch('setMyAnswer',params)
        this.$store.dispatch('delAnswerCount')
        return false
      }
      
      this.$store.dispatch('setMyAnswer',params)
      this.$store.dispatch('addAnswerCount')
    },
  }
}
</script>
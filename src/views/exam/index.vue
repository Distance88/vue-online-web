<template>
  <div class="ui container">
    <div class="my-exam-grade">
      <span>试卷年级:</span>
      <el-radio-group v-model="condition.grade" size="small" @change="getGrade">
        <el-radio-button v-for="(label, index) in grade_labels" :label="label" :key="index"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="my-exam-subject">
      <span>试卷科目:</span>
      <el-radio-group  v-model="condition.subject"  size="small"  @change="getSubject">
        <el-radio-button  v-for="(label, index) in subject_labels" :label="label" :key="index"></el-radio-button>
      </el-radio-group>
    </div>
    <el-divider></el-divider>
    <div class="my-exam-card">
      <el-card class="box-card" v-for="(exam, index) in examList" :key="index">
        <div slot="header" class="clearfix">
          <span>{{exam.title}}</span>
          <router-link style="float: right; padding: 3px 0" type="text" :to="{name:'examination', params:{id:exam.id}}">开始考试</router-link>
        </div>
        <div class="index-paper-item">考试年级：{{exam.grade}}</div>
        <div class="index-paper-item">考试科目：{{exam.subject}}</div>
        <div class="index-paper-item">考试时长：{{exam.time}}</div>
        <div class="index-paper-item">试卷总分：{{exam.score}}</div>
        <div class="index-paper-item">题目数量：{{exam.questionCount}}</div>
        <div class="index-paper-item">发布时间：{{exam.createTime}}</div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.ui.container {
  width: 80%;
  padding-top: 30px;
  height: 100vh;
}
.el-radio-button {
  margin: 0 15px;
  border-radius: 12px !important;
}
.my-exam-subject {
  margin-top: 25px;
}
.el-card {
  margin: 20px;
}
.box-card {
  width: 350px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.index-paper-item {
  margin-bottom: 6px;
  font-size: 14px;
  color: #9b9b9b;
  padding-bottom: 5px;
}
.clearfix:after {
  clear: both;
}
</style>
<script>
import examApi from "@api/exam";
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      condition: {
        grade: "",
        subject: ""
      },
      examList: [],
      grade_labels: [
        "六年级",
        "七年级",
        "八年级",
        "九年级",
        "高一",
        "高二",
        "高三"
      ],
      subject_labels: [
        "语文",
        "数学",
        "英语",
        "历史",
        "地理",
        "政治",
        "生物",
        "物理",
        "化学"
      ]
    };
  },
  methods: {
    ...mapActions(['setExam']),
    getGrade(value) {
      this.condition["grade"] = value;
      this.findExamByCondition(1);
    },
    getSubject(value) {
      this.condition["subject"] = value;
      this.findExamByCondition(1);
    },
    findExamByCondition(current) {
      let exam = this.$qs.stringify({
        grade: this.condition.grade,
        subject: this.condition.subject,
        current: current
      });
      const _this = this;
      examApi.findExamByCondition(exam).then(req => {
        _this.examList = req.data.records;
      });
    },
    
  }
};
</script>
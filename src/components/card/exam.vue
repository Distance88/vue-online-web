<template>
  <div class="my-container">
    <div class="ui container my-exam-head">
      <h2 class="ui center aligned header">数据结构</h2>
      <div class="info">
        <span>本卷共分为 4大题 26小题，作答时间为 120分钟，总分 100 分。</span>
      </div>
    </div>
    <div class="ui container" style="width: 80%;">
      <div class="ui grid">
        <div class="twelve wide column">
          <div class="my-question cards">
            <div class="my-choice-question-card">
              <div class="my-ruleTitle">
                <div class="my-secpart">一、选择题(本大题共5小题，共10分)</div>
                <div class="my-question">
                  <div class="ui segment my-xzt" v-for="(choices, index) in choiceList" :key="index">
                    <div class="my-question-title">
                      <div class="ui column">
                        <span class="my-text-question-oredr">{{index + 1}}</span>
                        <span class="my-text-question-style">[选择题,2分]</span>
                        <span class="my-text-question">{{choices.question}}</span>
                      </div>
                    </div>
                    <div class="my-question-choice">
                      <div class="ui column">
                        <el-radio-group v-model="choice[index]" @change="Completed(index)">
                          <el-radio label="A">
                            <span style="margin-right:5px;color:#999999">A.</span>
                              {{ choices.optiona }}
                          </el-radio>
                          <br />
                          <el-radio label="B">
                            <span style="margin-right:5px;color:#999999">B.</span>
                              {{ choices.optionb }}
                          </el-radio>
                          <br />
                          <el-radio label="C">
                            <span style="margin-right:5px;color:#999999">C.</span>
                              {{ choices.optionc }}
                          </el-radio>
                          <br />
                          <el-radio label="D">
                            <span style="margin-right:5px;color:#999999">D.</span>
                              {{ choices.optiond }}
                            </el-radio><br />
                        </el-radio-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-ruleTitle">
                <div class="my-secpart">二、填空题(本大题共10小题，共20分)</div>
                <div class="my-question">
                  <div class="ui segment" v-for="(blanks, index) in blankList" :key="index">
                    <div class="my-question-title">
                      <div class="ui column">
                        <span class="my-text-question-oredr">{{index + 1}}</span>
                        <span class="my-text-question-style">[填空题,2分]</span>
                        <span class="my-text-question" style="margin-bottom:20px">{{ blanks.question }}</span>
                        <el-input type="textarea" :rows="4" placeholder="此处作答" v-model="blanks.ttt" class="my-blank-answer"></el-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div class="my-answer">
             <div class="ui container">
            <div class="my-time-card">
              <div class="my-submit">
                <button class="ui orange button" @click="finshExam">
                  交卷
                </button>
              </div>
              <div class="my-time-meter">
                <div class="ui grid">
                  <div class="nine wide column">
                    <div class="my-timer">
                      <i class="icon clock outline"></i>
                      <span style="font-size:16px">用时：</span>
                      <span style="color:#f06000">{{ minute }}:{{ second }}</span>
                    </div>
                  </div>
                  <div class="seven wide column" >
                    <button class="ui mini labeled icon button" @click="select" style="width:86px !important">
                      <i :class="flag === true ? className1 : className2"></i>
                      <span style="font-size:10px !important">{{ flag === true ? "暂停" : "开始" }}</span>
                    </button>
                    <div class="ui page dimmer">
                      <div class="content">
                        <img src="../../static/images/rest.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-answer-card">
              <div class="ui container">
                <div class="my-answer-count">
                  <div class="ui centered  grid">
                    <div class="column">
                      <span class="my-text-answer-card">答题卡</span>
                      <span class="my-text-answer-card-count">0/25</span>
                    </div>
                  </div>
                </div>
                <div class="my-answer-desc">
                  <div class="ui container">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item name="1">
                        <template slot="title">
                          <span class="my-answer-card-title">选择题</span>
                          <span class="my-answer-card-desc">(共5题，共20分)</span>
                        </template>
                        <div class="my-panel-order my-xzt-panel">
                          <a v-for="index in choiceList.length" :key="index">{{index}}</a>                                                                                                                                                                                                                                              
                        </div>
                      </el-collapse-item>
                      <el-collapse-item name="2">
                        <template slot="title">
                          <span class="my-answer-card-title">填空题</span>
                          <span class="my-answer-card-desc">(共5题，共20分)</span>
                        </template>
                        <div class="my-panel-order">
                          <a v-for="index in blankList.length" :key="index">{{index}}</a> 
                        </div>
                      </el-collapse-item>
                      <el-collapse-item name="3">
                        <template slot="title">
                          <span class="my-answer-card-title">简答题</span>
                          <span class="my-answer-card-desc">(共5题，共20分)</span>
                        </template>
                        <div class="my-panel-order">
                          <a>1</a>
                          <a>2</a>
                          <a>3</a>
                          <a>4</a>
                          <a>5</a>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item name="4">
                        <template slot="title">
                          <span class="my-answer-card-title">综合题</span>
                          <span class="my-answer-card-desc">(共5题，共20分)</span>
                        </template>
                        <div class="my-panel-order">
                          <a>1</a>
                          <a>2</a>
                          <a>3</a>
                          <a>4</a>
                          <a>5</a>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
                <div class="my-answer-footer">
                  <div class="ui center aligned grid">
                    <div class="column">
                      <span>已做<button></button></span>
                      <span>未做<button style="background-color:#fff !important"></button></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped >
.my-container {
    width: 100%;
    height: 100%h;
    background-color: #f0f2f5;
  }
  .my-exam-head {
    width: 80%;
    background-color: #fff;
  }
  .my-exam-head h2 {
    font-size: 24px;
    padding-top: 50px;
    padding-bottom: 25px;
    opacity: 0.95;
    border-bottom: #e5e5e5 dashed 1px;
    color: #4c4c4c;
  }
  .my-exam-head .info {
    text-align: left;
    font-size: 14px;
    line-height: 25px;
    padding: 5px 0 15px 0;
    color: #666;
    margin: 0 30px;
  }
  .my-ruleTitle {
    padding: 15px 0;
  }
  .my-secpart {
    padding: 15px 30px;
    background: #fff9e9;
    border: 1px solid #ffeec4;
    border-radius: 2px;
    margin-bottom: 15px;
  }
  .my-answer{
    width: 280px;
  }
  .my-time-card {
    margin: 15px 0;
    height: 100%;
    background-color: #f9f9f9;
  }
  .my-submit {
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
  }
  .my-submit button {
    width: 200px;
  }
  .my-time-meter {
    color: #999;
    background: #fff;
  }
  .my-timer {
    padding-left: 15px;
    line-height: 28px;
    font-size: 15px;
  }
  .my-timer .icon {
    width: 1.4em !important;
    height: 1.4em !important;
  }
  .my-answer-count {
    margin: 15px 0;
    height: 100%;
    background-color: #f9f9f9;
  }
  .my-text-answer-card {
    margin-left: 20px;
    font-size: 16px;
    margin-right: 10px;
  }
  .my-text-answer-card-count {
    font-size: 17px;
    color: #f06000;
  }
  .my-answer-card-title {
    font-size: 14px;
    padding-left: 21px;
    border-left: solid 3px #f06000;
    height: 20px;
    line-height: 22px;
  }
  .my-answer-card-desc {
    font-size: 12px;
    margin-left: 5px;
    color: #999;
  }
  .my-panel-order {
    margin: 0 0 0 25px;
    overflow: hidden;
  }
  .my-panel-order a {
    float: left;
    cursor: pointer;
    margin: 0 1px 5px 0;
    width: 20px;
    height: 20px;
    line-height: 19px;
    border: 1px solid #e6e8ec;
    border-radius: 2px;
    outline: none;
    text-align: center;
    font-size: 12px;
    font-family: "Arial";
    color: #14191e;
  }
  .my-panel-order a:hover {
    background-color: #f06000;
    color: #ffffff;
  }
  .my-answer-footer {
    padding-top: 20px;
    padding-bottom: 15px;
    height: 40px;
    background-color: #fff;
  }
  .my-answer-footer button {
    cursor: pointer;
    margin: 0 10px 5px 4px;
    width: 14px;
    height: 14px;
    border: 1px solid #e6e8ec;
    border-radius: 2px;
    outline: none;
    text-align: center;
  }
  .my-text-question {
    color: #151515 !important;
    font-size: 16px;
    padding: 0 15px;
  }
  .my-text-question-oredr {
    font-size: 17px;
    padding: 0 15px;
    color: #f06000;
  }
  .my-text-question-style {
    font-size: 17px;
    color: #f06000;
  }
  .my-question-choice {
    padding-top: 20px;
  }
  .el-radio {
    padding: 10px 45px;
  }
  .my-blank-answer {
    padding-top: 25px;
    padding-left: 15px;
    padding-bottom: 20px;
  }
  .el-collapse-item__content {
    padding-bottom: 13px !important;
  }
</style>
<style >
.el-collapse-item__content {
  padding-bottom: 13px !important;
}
</style>
<script>
import $ from "jquery";
import examApi from "../../api/exam";
export default {
  data() {
    return {
      second: 0,
      minute: "00",
      timer: 0,
      className1: "pause icon",
      className2: "play icon",
      flag: true,
      activeNames: [],
      choice: [
        {
          question1: "",
          question2: "",
          question3: "",
          question4: ""
        }
      ],
      xzt: [],
      tkt: [],
      xzt1: "",
      type: 0,
      starttime: "",
      endtime: "",
      choiceList: {},
      blankList: [
        {
          id: 0,
          answer: "",
          question: "",
          questiontype: 0,
          type: 0,
          ttt: ""
        }
      ]
    };
  },
  methods: {
    setTimer() {
      this.second++;
      if (this.second >= 60) {
        this.second = 0;
        this.minute++;
        this.minute = this.minute < 10 ? "0" + this.minute : this.minute;
      }

      this.second = this.second < 10 ? "0" + this.second : this.second;
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
    handleChange(val) {
      console.log(val);
    },
    getChoicetOrder() {
      var rand = Math.floor(Math.random() * 10) + 1;
      for (var i = 0; i < this.xzt.length; i++) {
        if (this.xzt[i] == rand) {
          return false;
        }
      }
      this.xzt.push(rand);
    },
    getBlankOrder() {
      var rand = Math.floor(Math.random() * 10) + 1;
      for (var i = 0; i < this.xzt.length; i++) {
        if (this.tkt[i] == rand) {
          return false;
        }
      }
      this.tkt.push(rand);
    },
    getTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minu = now.getMinutes();
      var sec = now.getSeconds();
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;

      this.starttime =
        year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;

      this.endtime =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        (hour + 2) +
        ":" +
        minu +
        ":" +
        sec;
    },
    createExam() {
      let type = this.$route.params.type;
      for (var i = 0; i < 5; i++) {
        var flag = this.getChoicetOrder();
        if (flag == false) {
          i = i - 1;
        }
      }
      for (i = 0; i < 5; i++) {
        flag = this.getBlankOrder();
        if (flag == false) {
          i = i - 1;
        }
      }
      this.getTime();
      const _this = this;
      let exam = _this.$qs.stringify({
        starttime: _this.starttime,
        endtime: _this.endtime,
        xzt1: _this.xzt[0],
        xzt2: _this.xzt[1],
        xzt3: _this.xzt[2],
        xzt4: _this.xzt[3],
        xzt5: _this.xzt[4],
        tkt1: _this.tkt[0],
        tkt2: _this.tkt[1],
        tkt3: _this.tkt[2],
        tkt4: _this.tkt[3],
        tkt5: _this.tkt[4],
        examtype: type,
        choiceIds: _this.xzt,
        blankIds: _this.tkt
      });

      examApi.createExam(exam).then(req => {
        if (req.code == 200) {
          _this.choiceList = req.choiceList;
          _this.blankList = req.blankList;
          sessionStorage.setItem(
            "choiceList",
            JSON.stringify(_this.choiceList)
          );
          sessionStorage.setItem("blankList", JSON.stringify(_this.blankList));
        }
      });
    },
    finshExam() {
      let answer = {
        xzt: [],
        tkt: []
      };
      if (this.choice.length < 5) {
        for (var i = 0; i < 5; i++) {
          if (i <= this.choice.length) {
            answer.xzt[i] = this.choice[i] == undefined ? "" : this.choice[i];
          } else {
            answer.xzt[i] = "";
          }
        }
      } else {
        for (var k = 0; k < this.choice.length; k++) {
          answer.xzt[k] = this.choice[k] == undefined ? "" : this.choice[k];
        }
      }

      for (var j = 0; j < this.blankList.length; j++) {
        answer.tkt[j] =
          this.blankList[j].ttt == undefined ? "" : this.blankList[j].ttt;
      }

      console.log(answer);
    },
    Completed(index){
      document.querySelector('.my-xzt-panel').querySelectorAll('a')[index].style.backgroundColor = '#EFEFEF'
      let top = document.querySelectorAll('.my-xzt')[index].offsetTop + 370
      document.documentElement.scrollTop = top
    }
  },
  mounted() {
    if (window.performance.navigation.type == 1) {
      this.choiceList = JSON.parse(sessionStorage.getItem("choiceList"));
      this.blankList = JSON.parse(sessionStorage.getItem("blankList"));
    } else {
      this.createExam();
    }
  },
  created() {
    this.timer = setInterval(this.setTimer, 1000);
  }
};
</script>
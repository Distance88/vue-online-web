<template>
  <div class="ui container">
    <el-row align="middle" type="flex">
      <el-col :span="22">
        <div class="my-header">
          <span>
            <el-tooltip :content="show == true ? '隐藏答题卡' : '显示答题卡'" placement="top">
              <i :class="show == true?'my-icon el-icon-s-fold':'my-icon el-icon-s-unfold'" @click="changeVisible"></i>
            </el-tooltip>
            {{this.$store.getters.exam.title}}</span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">{{studentName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >我的考试</el-dropdown-item>
            <el-dropdown-item command="quit">退出考试</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.ui.container {
  width: 100%;
  padding: 15px;
  background-color: #409eff;
}
.ui.header {
  color: #fff;
}
.el-dropdown {
  cursor: pointer;
  color: #fff;
}
.my-header {
  float: left;
}
.my-header span {
  font-size: 23px;
  color: #fff;
}
.my-icon {
  margin: 0 8px;
  cursor: pointer;
}
</style>
<script>
export default {
  data(){
    return{
      show:true
    }
  },
  computed: {
    studentName(){
      return this.$store.getters.student.studentname
    }
  },
  methods: {
    changeVisible() {
      this.show = !this.show
      this.$emit("changeVisible");
    },
    handleCommand(command) {
      if(command === 'quit'){
        this.$confirm("是否退出考试？", "提示", {
            confirmButtonText: "退出考试",
            cancelButtonText: "继续做题",
            type: "warning"
        }).then(() => {
          this.$router.push('/exam')
        }).catch(() => {
          
        });
      }
    }
  }
};
</script>
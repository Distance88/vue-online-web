<template>
  <div>
    <div class="container">
      <div class="ui  segment">
        <div class="ui grid">
          <div class="four wide column">
            <h3 class="ui right aligned header teal" style="margin-top:10px">
              <svg class="icon icon-header" aria-hidden="true">
                <use href="#icon-ziyuan1" />
              </svg>
              OnLine Exam
            </h3>
          </div>
          <div class="eight wide column">
            <el-menu 
              :default-active="activeIndex" 
              class="el-menu-demo" 
              mode="horizontal" 
              active-text-color="#57AEFF"
              @select="handleSelect" >
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/exam/examCard">在线考试</el-menu-item>
                <el-menu-item index="">题库训练</el-menu-item>
                <el-menu-item index="/paper">我的考试</el-menu-item>
            </el-menu>
          </div>
          <div class="four wide column">
            <el-dropdown trigger="click" @command="handleCommand" style="cursor:pointer;margin-top:20px !important">
                <span class="el-dropdown-link">
                  <img
                    class="ui avatar image"
                    src="../../static/images/user.jpg"
                  />
                  <span class="my-username">{{studentName}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                <el-dropdown-item command="b">修改头像</el-dropdown-item>
                <el-dropdown-item command="c">项目仓库</el-dropdown-item>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ui.segment {
  border-radius: 0em !important;
}
.ui.header {
  line-height: 48px;
}
.wide.column{
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}
.icon {
  width: 1.2em !important;
  height: 1.2em !important;
  vertical-align: -0.2em;
  fill: currentColor;
  overflow: hidden;
}
.my-icon {
  margin-top: 4px !important;
}
.el-dropdown {
  margin-top: 10px !important;
  margin-left: 50px !important;
}
.my-username {
  margin-left: 5px;
}
.ui.secondary.menu .active.item{
  color: #005;
  background: #ffd550;
}
.el-menu-item{
  font-size: 16px;
}
</style>
<script>
export default {
  data(){
      return{
        activeIndex: '/home',
      }
  },
  computed: {
    studentName(){
      return this.$store.getters.student.studentname
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.$message({
          message: "注销成功!",
          type: "success",
          duration: 1500,
        });
        sessionStorage.clear();
        this.$router.push("/login");
      }
    },
    handleSelect(key) {
      this.$router.push(key)    
    }
  },
  created(){
    this.$store.dispatch('setStudent', JSON.parse(sessionStorage.getItem('student')))
  }
}
</script>
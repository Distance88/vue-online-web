<template>
  <div class="loginBody">
    <el-form ref="form" class="my-el-form">
      <div class="login_face">
        <img src="../../static/images/user.jpg" class="userAvatar" />
      </div>
      <el-form-item id="username" class="my-el-form-item">
        <label for="username" class="my-label">用户名</label>
        <el-input required="true" v-model="studentid" @focus="handleFocus" @blur="handleBlur"></el-input>
      </el-form-item>
      <el-form-item id="password" class="my-el-form-item">
        <label for="password" class="my-label">密码</label>
        <el-input v-model="password" @focus="handleFocus" @blur="handleBlur" show-password></el-input>
      </el-form-item>
      <el-form-item id="captchaCode" class="my-el-form-item">
        <label for="captchaCode" class="my-label">验证码</label>
        <el-input @focus="handleFocus" @blur="handleBlur" v-model="captchaCode" style="width: 135px; margin-right: 5px"></el-input>
        <div style="display: inline-block" id="code" @click="changeCode" ref="captchaCode"></div>
      </el-form-item>
      <el-form-item>
        <el-button
          style="background-color: #009688; width: 100%; color: #fff" @click="login">登陆</el-button>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <a @click="getMessage()">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qq-copy"></use>
                </svg>
              </a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <a @click="getMessage()">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin"></use>
                </svg>
              </a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <a @click="getMessage()">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-git"></use>
                </svg>
              </a>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scpode src='../../static/css/login.css'></style>
<style scoped>
#code {
  background-image: url("../../static/images/code.jpg");
  height: 36px;
  width: 116px;
  float: right;
  font-family: Comic Sans MS;
  font-style: italic;
  font-size: 26px;
  text-align: center;
  cursor: pointer;
}
.el-input__inner:focus {
  border: 0.8px solid #ff6700 !important;
}
</style>
<script>
import loginApi from "../../api/login";
export default {
  inject: ["reload"],
  data() {
    return {
      studentid: "",
      password: "",
      captchaCode: "",
      code: "",
    };
  },
   
  methods: {
    login() {
      const _this = this;
      let student = _this.$qs.stringify({
        studentid: this.studentid,
        password: this.password,
      });
      if (this.captchaCode.toUpperCase() == this.code.toUpperCase()) {
        loginApi.login(student).then((req) => {
          if (req.code == 200) {
            _this.$message({
              message: req.msg,
              type: "success",
              duration: 1500,
            });
            sessionStorage.setItem("token",req.token);
            sessionStorage.setItem("student",JSON.stringify(req.student));
            _this.$router.push("/");
          } else {
            _this.$message({
              message: req.msg,
              type: "error",
              duration: 1500,
            });
          }
        });
      } else {
        this.$message({
          message: "验证码错误",
          type: "error",
          duration: 1500,
        });
        this.captchaCode = "";
      }
    },
    handleFocus(event) {
      let id = event.currentTarget.parentElement.parentElement.parentElement.id;
      document.querySelector("#" + id).className =
        "my-el-form-item my-el-form-item-focus";
    },
    handleBlur(event) {
      let id = event.currentTarget.parentElement.parentElement.parentElement.id;
      let val = event.target.value;
      if (val == "") {
        document.querySelector("#" + id).className = "my-el-form-item";
      } else {
        document.querySelector("#" + id).className =
          "my-el-form-item my-el-form-item-blur";
      }
    },
    getMessage() {
      this.$message({
        message: "这只是一个样式",
        type: "warning",
      });
    },
    changeCode() {
      var R = Math.floor(Math.random() * (255 - 10 + 1) + 10);
      var G = Math.floor(Math.random() * (255 - 10 + 1) + 10);
      var B = Math.floor(Math.random() * (255 - 10 + 1) + 10);
      let sCode =
        "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");
      var aLength = aCode.length;
      this.code = "";
      for (var i = 0; i < 5; i++) {
        var j = Math.floor(Math.random() * aLength);
        this.code = this.code + aCode[j];
      }
      document.querySelector("#code").innerHTML = this.code;
      this.$refs.captchaCode.style.color = "rgb(" + R + "," + G + "," + B + ")";
    },
  },
  mounted() {
    this.changeCode();
  },
  created() {
    
    let that = this;
    document.onkeypress = function(e) {
    if(that.$route.path ==='/login'&&(e.code=='Enter'||e.code=='NumpadEnter')){//验证在登录界面和按得键是回车键enter
        that.login()
    }
  };
 }
};
</script>
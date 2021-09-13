<template>
  <div class="my-container">
    <div class="ui container">
      <div class="ui grid">
        <div class="seven wide column">
          <div class="my-text">
            <h1 class="my-title">
              Online Exam
            </h1>
            <p class="my-desc">基于SpringBoot+Vue技术栈开发的在线考试系统</p>
            <el-row>
              <el-button type="primary" size="medium">预览</el-button>
              <el-button size="medium">开始使用</el-button>
            </el-row>
          </div>
        </div>
        <div class="nine wide column">
          <div class="recommendPage">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide>
                  <img class="ui image rounded" src="../../static/images/computer1.jpg"/>
                </swiper-slide>
              <swiper-slide><img class="ui image rounded" src="../../static/images/computer2.jpg"/></swiper-slide>
              <swiper-slide><img class="ui image rounded" src="../../static/images/computer3.jpg"/></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.my-container {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
}
.ui.container {
  padding-left: 9em;
  width: 80%;
}
.my-text {
  padding-top: 4.5em;
}
.my-title {
  opacity: 0.95;
  font-size: 16px;
  font-weight: 400 !important;
  color: #333;
}
.my-desc {
  padding-top: 1em;
  padding-bottom: 5em;
  font-size: 18px;
  line-height: 1.5;
  color: #314659;
  opacity: 0.95;
}
.recommendPage .swiper-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: pink;
}
.recommendPage .swiper-container .swiper-slide {
  width: 100%;
  line-height: 200px;
  background: yellowgreen;
  color: #000;
  font-size: 16px;
  text-align: center;
}
</style>
<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  }
};
</script>

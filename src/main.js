import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '../node_modules/semantic-ui-css/semantic.min.css'
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/semantic-ui-css/semantic'
import '../node_modules/wowjs/css/libs/animate.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(ElementUI);
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if(sessionStorage.getItem('token')){ //判断本地是否存在access_token
      next();
    }else {
      ElementUI.Message({
        message:"您还没有登录!",
        type:"error",
        duration:1000
      })
      next({
        path:'/login'
      })
    }
  }
  else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


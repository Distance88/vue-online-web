import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
import Layout from '@/layout'
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),

  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        needLogin: true
      },
    }]

  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/examCard',
    children: [{
      path: 'examCard',
      name: 'examCard',
      component: () => import('@/views/exam/index'),
      meta: {
        needLogin: true
      },
    }]

  },
  {
    path: '/examination/:id',
    name: 'examination',
    component: () => import('@/views/examination/index'),
    meta: {
      needLogin: true
    },
  },
  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/list',
    children: [{
        path: 'list',
        name: 'list',
        component: () => import('@/views/paper/list'),
        meta: {
          needLogin: true
        },
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () => import('@/views/paper/detail'),
        meta: {
          needLogin: true
        },

      }
    ]
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
  mode: 'history',
})

export default router
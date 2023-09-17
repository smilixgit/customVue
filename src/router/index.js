import Vue from 'vue'
import VueRouter from 'vue-router'  
import alipayVerify from '@/views/alipayVerify.vue' 
import index from '@/views/index.vue' 
import myOrder from '@/views/myOrder.vue'
import mine from '@/views/mine/index.vue'
import phoneLogin from '@/views/phoneLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/index'
  }, {
    path: '/alipayVerify',
    component: alipayVerify
  }, {
    path: '/phoneLogin',
    component: phoneLogin
  }, {
    path: '/index',
    component: index
  } , {
    path: '/myOrder',
    component: myOrder
  }  , {
    path: '/mine',
    component: mine
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

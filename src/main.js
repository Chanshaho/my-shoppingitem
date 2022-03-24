import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import Vant from 'vant'
import "vant/lib/index.css"
import "amfe-flexible/index"
import "@/assets/css/font-awesome.min.css"
Vue.use(Vant)
Vue.config.productionTip = false

import VueRouter from 'vue-router'

import VuexStore from '@/store/index'


router.beforeEach((to,from,next)=>{
  if(to.meta.needLogin&&!VuexStore.getters.logintoken){
    if (from.name === 'Login') {
      return;
    }
    return next('/login')
  }
  next()
});

//需要添加的代码
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

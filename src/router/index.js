import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',//
    name: 'Order',
    component: () => import('../views/Order.vue'),
    caseSensitive: false,
    children: [
      {
        path: 'list/:listid',
        name: "List",
        props: true,
        component: () => import('@/views/List.vue')
      }
    ]
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('../views/Classify.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('../views/Submit.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta:{needLogin:true}
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta:{needLogin:true},   
  },
  {
    path: '/user/data',
    name: 'Data',
    component: () => import('../views/Data.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    props:true,
    meta:{
      hidenav:true
    }
  },
  {
    path: '/hot_new_goods/:id',
    name: 'Hot_new_goods',
    component: () => import('../views/Hot_new_goods.vue'),
    props:true,
  },
  {
    path: '/goods_list',
    name: 'Goods_list',
    component: () => import('../views/Goods_list.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return {x:0,y:0}
  }
})


export default router

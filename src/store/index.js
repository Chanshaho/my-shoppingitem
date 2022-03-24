import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'js-cookie'
import _axios from '../plugins/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    banner: [],
    result: null,
    fastlist: [],
    bestbanner:[],
    bestlist: [],
    token:null,
    userinfo:null
  },
  getters: {
    logintoken(state){
      if(state.token==null||state.token.length<1){
        state.token=cookies.get("token")
        if(!state.token){
          state.token=localStorage.getItem("token")
        }
      }
      return state.token
    },
    loginuser(state){
      if(!state.userinfo||!state.userinfo.id){
        state.userinfo=JSON.parse(localStorage.getItem('user_info'))
      }
      return state.userinfo
    },
    logorder(state){
      if(!state.userOrder || !state.userOrder.id){
        state.userOrder=JSON.parse(localStorage.getItem('user_order'))
      }
      return state.userOrder;
    }
  },
  mutations: {
    Searchpro(state,result){
      state.banner = result.data.data.banner
      state.result = result.data.data
      state.fastlist = result.data.data.info.fastList
      state.bestbanner = result.data.data.info.bastBanner
      state.bestlist = result.data.data.info.bastList
    },
    saveToken(state,payload){
          state.token=payload
          cookies.set("token",payload,{expires:1})
          localStorage.setItem("token",payload)
    },
    loginout(state){
     state.token=null
     cookies.remove("token")
     localStorage.removeItem("token")
    },
    loginUser(state,payload){
       state.userinfo=payload
       localStorage.setItem("user_info",JSON.stringify(payload))
    },
    saveuserOrder(state,payload){
      state.userOrder=payload;
      localStorage.setItem('user_order',JSON.stringify(payload));
    }
  },
  actions: {
    Productlist(context){
      axios.get("http://47.115.51.185/api/index").then(result => {
        context.commit('Searchpro', result)
      })
    },
    getuserInfo(context){
      _axios.get('/user',{
        headers:{
          'Authori-zation':'Bearer '+ context.state.token
        }
      }).then(result=>{
        context.commit("loginUser",result.data.data)
      })
    },
    getuserOrder(context){
      _axios.get('/menu/user',{
        headers:{
          "Authori-zation": "Bearer "+context.state.token
        }
      }).then(result=>{
        context.commit('saveuserOrder',result);
      });
    }
}
})

<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar route
                active-color="#ee0a24"
                inactive-color="#000"
                v-if="!$route.meta.hidenav">
      <van-tabbar-item replace
                       to="/"
                       icon="home-o">
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/classify"
                       icon="apps-o">
        <span>分类</span>
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/cart"
                       icon="shopping-cart-o">
        <span>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/user"
                       icon="user-o">
        <span>个人中心</span>
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>
<script>
export default {

};
</script>

<style lang="less">
#app {
  padding-bottom: 50px;
}
</style>

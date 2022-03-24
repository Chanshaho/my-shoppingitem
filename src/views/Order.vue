<template>
  <div class="order">
    <div class="order_top">
      <div>
        <h4>订单信息</h4>
        <span>累计订单：0 总消费：￥0</span>
      </div>
      <img src="../assets/image/order_img.png">
    </div>
    <div class="order_nav">
      <van-tabs :ellipsis='false'
                v-model="active">
        <van-tab :title="`待付款 ${loginuser.orderStatusNum.unpaid_count}`"
                 to='/order/list/0'></van-tab>
        <van-tab :title="`待发货 ${loginuser.orderStatusNum.order_count}`"
                 to='/order/list/1'></van-tab>
        <van-tab :title="`待收货 ${loginuser.orderStatusNum.received_count}`"
                 to='/order/list/2'></van-tab>
        <van-tab :title="`待评价 ${loginuser.orderStatusNum.evaluated_count}`"
                 to='/order/list/3'></van-tab>
        <van-tab :title="`已完成 ${loginuser.orderStatusNum.complete_count}`"
                 to='/order/list/4'></van-tab>
      </van-tabs>
      <router-view />
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(["loginuser"]),
    active: {
      get () {
        return parseInt(this.$route.params.listid);
      },
      set (newValue) {
        return newValue;
      }
    }

  },
  created () {

  }
}
</script>
<style lang="less">
.order {
  background-color: #eee;
  .order_top {
    display: flex;
    height: 95px;
    background: rgb(233, 51, 35);
    color: #fff;
    position: relative;
    div {
      flex: 1;
      margin: 25px 0px 0px 10px;
      h4 {
        font-size: 17px;
        font-weight: bold;
      }
      span {
        display: inline-block;
        font-size: 13px;
        padding-top: 15px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    img {
      width: 60px;
      height: 55px;
      margin: 20px 10px;
    }
    &::before {
      content: '';
      position: absolute;
      width: 100vw;
      height: 40px;
      background: rgb(233, 51, 35);
      bottom: -39px;
      left: 0px;
      z-index: -1;
    }
  }
  .order_nav {
    .van-tabs {
      margin: 0px 15px;
      .van-tabs__wrap {
        border-radius: 5px;
        height: 70px;
        .van-tab {
          flex: 1;
          padding: 0px 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>


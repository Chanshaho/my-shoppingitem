<template>
  <div class="pay">
    <i class="fa fa-check-circle"
       aria-hidden="true"></i>
    <div class="paySuccess">
      <h4>订单支付成功</h4>
      <ul v-if="pay.result">
        <li>
          <h5>订单编号</h5>
          <span>{{ pay.result.orderId }}</span>
        </li>
        <li>
          <h5>下单时间</h5>
          <span>{{paytime.add_time_y}}</span>
        </li>
        <li>
          <h5>支付方式</h5>
          <span>余额支付</span>
        </li>
        <li>
          <h5>支付金额</h5>
          <span>{{paytime.gain_integral}}</span>
        </li>
      </ul>
    </div>
    <div class="paybtn">
      <button @click="finish">完成</button>
      <!-- <button>返回首页</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //存订单
      pay: [],
      //存订单时间里面和其他东西
      paytime: [],
    };
  },
  created () {
    this.axios({
      method: "POST",
      url: `/order/create/${this.$route.params.cid}`,
      data: {
        addressId: this.$route.params.addressId,
        payType: "yue",
        from: "weixinh5",
      },
      headers: {
        "Authori-zation": "Bearer " + localStorage.getItem("token"), //带上登录信息去请求购物车的产品
      },
    }).then((res) => {
      this.pay = res.data.data;
      this.axios({
        method: "GET",
        url: `/order/detail/${this.pay.result.orderId}`,
        headers: {
          "Authori-zation": "Bearer " + localStorage.getItem("token"), //带上登录信息去请求购物车的产品
        },
      }).then((res) => {
        this.paytime = res.data.data;
      });
    });
  },
  methods: {
    finish () {
      this.$router.push({ name: 'User' })
    }
  },
};
</script>

<style lang="less" scoped>
.pay {
  background-color: #eee;
  min-height: 76vh;
  position: relative;
  padding-top: 100px;
  .fa-check-circle {
    font-size: 80px;
    color: rgb(233, 51, 35);
    text-align: center;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
  }
  .paySuccess {
    background-color: #fff;
    margin: 0px 15px;
    h4 {
      height: 100px;
      line-height: 140px;
      font-size: 16px;
      text-align: center;
      font-weight: bold;
    }
    ul {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      li {
        display: flex;
        line-height: 30px;
        font-size: 14px;
        justify-content: space-between;
        padding: 0px 10px;
        span {
          color: #aaa;
        }
      }
    }
  }
  .paybtn {
    height: 120px;
    background-color: #fff;
    margin: 0px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    button {
      display: block;
      height: 40px;
      padding: 5px 120px;
      font-size: 16px;
      border: none;
      border-radius: 20px;
      &:first-child {
        background-color: rgb(233, 51, 35);
        color: #fff;
        margin-top: 24px;
      }
      &:nth-child(2) {
        background-color: #fff;
        border: 1px solid rgb(233, 51, 35);
        color: rgb(233, 51, 35);
      }
    }
  }
}
</style>
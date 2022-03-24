<template>
  <div class="orderlist">
    <div class="top">
      <div class="topnav">
        <!-- <van-dialog v-model="show" title="标题" show-cancel-button> -->
        <span @click="tis">到店自提</span>
        <div class="choose-address">
          <!-- 具体的详细信息 -->
          <div class="detail-user">
            <div class="top-user">
              <div class="user-name">薛之谦</div>
              <div class="user-tel">10086</div>
              <div class="user-default">默认</div>
            </div>
            <div class="botom-user">广东省广州市天河区</div>
          </div>
        </div>
      </div>
    </div>
    <div class="commodity">
      <h4 class="pri">{{ "共" + product.product.length + "件商品" }}</h4>
      <div class="goodsList"
           v-for="(item, index) in product.product"
           :key="index">
        <van-card :price="item.costPrice"
                  :desc="`属性：${item.productInfo.attrInfo.suk}`"
                  :title="item.productInfo.store_name"
                  :thumb="item.productInfo.image">
        </van-card>
      </div>
    </div>
    <div class="goodsuers">
      <van-cell title="优惠券"
                @click="botshow"
                is-link
                value="请选择" />

      <van-cell title="积分抵扣">
        <template #default>
          <span>当前积分</span>
          <span style="color: #e93323"> 0.00</span>
          <van-radio />
          <!-- <input type="checkbox"> -->
        </template>
      </van-cell>
      <van-cell title="快递费用"
                value="免运费" />
      <van-cell title="备注信息"
                label="描述信息">
        <template #label>
          <textarea placeholder="请添加备注（150字以内）"></textarea>
        </template>
      </van-cell>
    </div>
    <div class="pay">
      <h4>支付方式</h4>
      <div class="payWay">
        <div @click="titis">
          <i class="fa fa-weixin"
             aria-hidden="true"></i>
          <h5>微信支付</h5>
        </div>
        <span>微信快捷支付</span>
      </div>
      <div class="payWay acive">
        <div>
          <i class="fa fa-jpy"
             aria-hidden="true"></i>
          <h5>余额支付</h5>
        </div>
        <span>可用余额:{{ loginuser.now_money }}</span>
      </div>
    </div>
    <div class="paybuttom">
      <van-cell title="商品总价："
                :value="sumprice" />
      <van-cell title="运费："
                value="￥0.00" />
    </div>
    <div class="paybtn">
      <div>
        <h4>合计：</h4>
        <span>{{ sumprice }}</span>
      </div>
      <button @click="gopay">立即结算</button>
    </div>

    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '30%' }">
      <img class="imgs"
           src="http://47.115.51.185/h5/img/noCoupon.e524084b.png"
           alt="" />
    </van-popup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      show: false,
      product: [],
      // sumprice:0
      ID: [],
      IDP: "",
      orderKey: "",//存储提交订单时候请求订单的商品返回的一个唯一的orderKey(唯一的id)
      addressInfo: 0,//存储提交订单时候请求订单的商品返回的一个addressInfo
    };
  },
  created () {
    this.product = this.$route.params;
  },
  mounted () {
    for (let i = 0; i < this.product.product.length; i++) {
      this.ID.push(this.product.product[i].id);
    }
    toString(this.ID);
    this.IDP = this.ID.join();
    this.axios({
      method: "POST",
      url: "/order/confirm",
      data: {
        cartId: `${this.IDP}`,
      },
      headers: {
        "Authori-zation": "Bearer " + localStorage.getItem("token"), //带上登录信息去请求购物车的产品
      },
    }).then((res) => {
      this.orderKey = res.data.data.orderKey
      this.addressInfo = res.data.data.addressInfo.id
    })
  },
  methods: {
    tis () {
      this.$toast("暂无门店信息你无法选择到店自提");
    },
    titis () {
      this.$toast("暂未查找到微信请确认是否安装");
    },
    botshow () {
      this.show = true;
    },
    gopay () {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$router.push({
        name: "Pay",
        params: {
          cid: this.orderKey,
          momey: this.sumprice,
          addressId: this.addressInfo
        },
      });
    },
  },
  computed: {
    sumprice () {
      return (this.$route.params.sumprice / 100).toFixed(2);
    },
    ...mapGetters(["loginuser"]),
  },
};
</script>
<style lang="less" scoped>
.pri {
  font-size: 16px;
  line-height: 40px;
  margin-left: 15px;
}
.imgs {
  // background-size: cover;
  width: 100vw;
  height: 150px;
}
.van-multi-ellipsis--l2 {
  -webkit-line-clamp: 1;
}
.van-card__desc {
  margin-top: 15px;
}
.orderlist {
  width: 100vw;
  height: 100%;
  background-color: #eee;
  .top {
    width: 100%;
    // height: 126.5px;
    padding: 1.2rem 0px 10px 0px;
    background-image: linear-gradient(180deg, #e93323 0, #f5f5f5);
    .topnav {
      width: 95%;
      height: 80px;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
      span {
        position: absolute;
        top: -28px;
        right: 0px;
        width: 180px;
        text-align: center;
        line-height: 0.8rem;
        font-size: 16px;
        color: red;
        background-color: #f7c1bd;
        border-radius: 0px 3px 0px 0px;
      }
      &::after {
        position: absolute;
        top: -35px;
        content: '\5FEB\9012\914D\9001';

        display: block;
        height: 0;
        width: 5rem;
        font-size: 16px;
        border-width: 0 0.3rem 1.2rem 0;
        border-style: none solid solid;
        border-color: transparent transparent #fff;
        z-index: 9;
        color: red;

        text-align: center;
        line-height: 1.1rem;
      }

      .choose-address {
        // height: 100px;
        background: white;
        padding: 10px;
        // 上右下左
        border-radius: 10px 10px 0 0;
      }

      .top-user {
        display: flex;
        align-items: center;
        height: 20px;
        font-size: 14px;
        margin-top: 10px;
        div {
          margin-right: 5px;
        }

        .user-default {
          background: rgb(238, 71, 104);
          color: white;
          width: 40px;
          line-height: 18px;
          text-align: center;
          border-radius: 10px;
        }
      }

      .botom-user {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  .commodity {
    background-color: #fff;
    .goodsList {
      h4 {
        font-size: 15px;
        line-height: 20px;
        padding: 10px 0px 10px 15px;
        border-bottom: 1px solid #eee;
      }
      .van-card {
        margin: 0px;
        background-color: #fff;
        .van-card__content {
          .van-card__price {
            color: #e93323;
          }
        }
      }
    }
  }
  .goodsuers {
    margin-top: 10px;
    .van-radio {
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
    }
    .van-cell__title {
      span {
        line-height: 30px;
      }
      .van-cell__label {
        textarea {
          background-color: #eee;
          border: 0px;
          width: 345px;
          max-width: 325px;
          padding: 10px 10px;
          font-size: 15px;
          resize: none;
        }
      }
    }
  }
  .pay {
    background-color: #fff;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 10px;
    h4 {
      padding: 15px;
    }
    .payWay {
      display: flex;
      line-height: 40px;
      height: 40px;
      margin: 10px;
      border: 1px solid #eee;
      border-radius: 6px;
      div {
        display: flex;
        align-items: center;
        width: 50vw;
        justify-content: center;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          height: 26px;
          width: 1px;
          background-color: #eee;
          top: 50%;
          right: 0px;
          transform: translateY(-50%);
        }
      }
      i {
        display: block;
        width: 22px;
        height: 22px;
        background-color: green;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
      }
      .fa-jpy {
        background-color: #fe960f;
      }
      span {
        width: 50vw;
        text-align: center;
      }
    }
    .acive {
      //点击选中改变边款颜色
      border-color: #e93323;
      h5 {
        color: #e93323;
      }
    }
  }
  .paybuttom {
    margin-top: 10px;
  }
  .paybtn {
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    padding: 10px 15px;
    font-size: 14px;
    align-items: center;
    div {
      flex: 1;
      display: flex;
      span {
        color: #e93323;
      }
    }
    button {
      padding: 10px 30px;
      border: 0px;
      background-color: #e93323;
      color: #fff;
      border-radius: 20px;
    }
  }
}
</style>
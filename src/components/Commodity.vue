<template>
  <div class="commodity">
    <div class="goodsList" v-for="(item, index) in commodityList" :key="index">
      <!-- <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-checkbox :name="index"></van-checkbox>
      </van-checkbox-group> -->
      <van-checkbox @click="danSelect" v-model="item.checked"></van-checkbox>
      <van-card
        :price="item.costPrice"
        :desc="`属性：${item.productInfo.attrInfo.suk}`"
        :title="item.productInfo.store_name"
        :thumb="item.productInfo.image"
      >
        <template #footer>
          <van-stepper
            v-model="item.cart_num"
            @change="numadd(item, item.cart_num)"
          />
        </template>
      </van-card>
    </div>
    <van-submit-bar
      v-if="!show"
      :price="allPice"
      button-text="立即下单"
      @submit="submit"
    >
      <van-checkbox v-model="allChoose" @click="allSelect">全选</van-checkbox>
    </van-submit-bar>
    <van-submit-bar
      v-else
      :price="allPice"
      button-text="删除"
      @submit="delete1"
    >
      <van-checkbox v-model="allChoose" @click="allSelect">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      // result: [],

      //控制全局是否选中按钮
      allChoose: false,
      // 装要删除的购物车信息
      delArr: [],
      product: [],
      //把商品总价传到订单页面
      // allpic:0
    };
  },
  props: ["commodityList", "show"],

  methods: {
    numadd(item, value) {
      // console.log(this.$refs.count)
      console.log("value,item.id", value, item.id);
      let id = item.id;

      this.axios
        .post(
          "/cart/num",
          {
            id: id,
            number: value,
          },
          {
            headers: {
              "Authori-zation": "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((re) => {
          console.log(re);
        });
    },
    danSelect() {
      // //吧选择中的购物车选中商品信息存到product数组
      // this.commodityList.map((v) => {
      //   if (v.checked == true) {
      //     this.product.push(v);
      //   }
      // });

      //遍历如果有一个是没有选的那么全选按钮就是false
      for (let i = 0; i < this.commodityList.length; i++) {
        if (this.commodityList[i].checked == false) {
          this.allChoose = false;
          return;
        }
      }
      //否则就是true(代表全部都选中了)
      this.allChoose = true;
    },
    allSelect() {
      for (let i = 0; i < this.commodityList.length; i++) {
        this.commodityList[i].checked = this.allChoose;
      }
    },
    submit() {

      if (!localStorage.getItem("token")) {
        this.$toast("请登录");
        this.$router.push({ name: "Login" });
      } else {
        // for (let i = 0; i < this.commodityList.length; i++) {
        //   if (this.commodityList[i].checked != true) {
        //     this.$toast("请选择商品");
        //     return;
        //   }
        // }

        //吧选择中的购物车选中商品信息存到product数组
        this.commodityList.map((v) => {
          if (v.checked == true) {
            this.product.push(v);
          }
        });

        if (this.product.length <= 0) {
          this.$toast("请选择商品");
          return;
        }
        // console.log("this.product在commodity组件",this.product);

        //吧选择中的购物车商品信息传到submit组件
        this.$router.push({
          name: "Submit",
          params: {
            product: this.product,
            allpic: this.allPice,
          },
        });
        // console.log("product",this.product);
      }





    },
    // 专门来处理勾选的数据
    collection() {
      this.delArr = []; //每次收集之前都把上一次收集的数据清空
      this.commodityList.map((v) => {
        // 判断如果是勾选的，那么就添加
        if (v.checked == true) {
          this.delArr.push(v.id);
          // this.product.push(v)
        }
      });
    },
    delete1() {
      // 如果没有登录就跳转登录界面
      if (!localStorage.getItem("token")) {
        // 跳转到登陆页面
        this.$router.push({ name: "Login" });
        return;
      }
      // 删除之前把要删除的购物车id收集起来
      this.collection();
      this.axios({
        method: "post",
        url: "/cart/del",
        headers: {
          "Authori-zation": "Bearer " + localStorage.getItem("token"),
        },
        data: {
          ids: this.delArr,
        },
      })
        .then((res) => {
          console.log("删除成功", res);
          location.reload();
        })
        .catch((err) => {
          console.log("删除失败", err);
        });
    },
  },
  computed: {
    allPice() {
      let price = 0;
      for (let i = 0; i < this.commodityList.length; i++) {
        if (this.commodityList[i].checked) {
          //判断选中的商品
          price =
            price +
            Number(this.commodityList[i].cart_num) *
              Number(this.commodityList[i].costPrice);
          // this.allpic=price
        }
      }

      return Number(price * 100);
    },
  },
};
</script>
<style lang="less" scoped>
.van-card__footer {
  transform: translateY(-30px);
}
.commodity {
  width: 100vw;
  height: 70vh;
  overflow: auto;
  .goodsList {
    position: relative;
    height: 105px;
    // height: 130px;
    .van-checkbox {
      position: absolute;
      z-index: 2;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
    }
    .van-card__desc {
      line-height: 30px;
    }
    .van-card {
      padding-left: 40px;
      height: 100%;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>


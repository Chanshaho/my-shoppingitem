<template>
  <div class="cart">
    <div class="top">
      <div>
        <i class="fa fa-check-square-o "></i>
        <span>100%正品保证</span>
      </div>
      <div>
        <i class="fa fa-check-square-o "></i>
        <span>所有商品精挑细选</span>
      </div>
      <div>
        <i class="fa fa-check-square-o "></i>
        <span>售后无忧</span>
      </div>
    </div>
    <div class="sum">
      <div class="left">
        <h2>购物数量</h2>
        <h1>{{productlist.length}}</h1>
      </div>
      <span v-if="!isdel"
            @click="changeisdel">管理</span>
      <span v-else
            @click="changeisdel">取消</span>
    </div>
    <div class="prolist">
      <ul>
        <li v-for="(i,index) in productlist"
            :key="index">
          <van-checkbox checked-color="red"
                        v-model="i.checked"
                        @click="changexbox"></van-checkbox>
          <router-link :to="`/detail/${i.product_id}`">
            <img :src="i.productInfo.image"
                 alt="">
          </router-link>
          <div class="p-text">
            <h1>{{i.productInfo.store_name}}</h1>
            <h2>属性：{{i.productInfo.attrInfo.suk}}</h2>
            <div class="right">
              <span>￥{{i.costPrice}}</span>
              <van-stepper :value="i.cart_num"
                           integer
                           @change="changenum(index,$event)" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <no-search v-if="productlist.length==0"></no-search>
    <div v-else>
      <van-submit-bar :price="sumprice"
                      button-text="提交订单"
                      v-if="!isdel"
                      @submit="gotoSubmit">
        <van-checkbox v-model="checkedall"
                      @input="changebox"
                      checked-color="red">全选</van-checkbox>
      </van-submit-bar>
      <van-submit-bar v-else
                      :price="sumprice"
                      button-text="删除"
                      class="del"
                      @submit="delpro">
        <van-checkbox v-model="checkedall"
                      @input="changebox"
                      checked-color="red">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import NoSearch from '../components/NoSearch.vue'
export default {
  components: { NoSearch },
  data () {
    return {
      isdel: false,
      productlist: [],
      checkedall: false,
      delArr: [],
      product: []
    }
  },
  computed: {
    sumprice () {
      let i = this.productlist.filter((item) => item.checked).reduce((pre, cur) => {
        return pre + cur.costPrice * cur.cart_num * 100
      }, 0)
      return i
    }
  },
  created () {
    this.getproductlist()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getproductlist()
    });
  },
  methods: {
    gotoSubmit () {
      this.productlist.map((v) => {
        if (v.checked == true) {
          this.product.push(v);
        }
      });
      if (this.product.length <= 0) {
        this.$toast("请选择商品");
        return;
      }
      this.$router.push({
        name: "Submit",
        params: {
          product: this.product,
          sumprice: this.sumprice,
        },
      });
    },
    collection () {
      this.delArr = []; //每次收集之前都把上一次收集的数据清空
      this.productlist.map((v) => {
        // 判断如果是勾选的，那么就添加
        if (v.checked == true) {
          this.delArr.push(v.id);
          // this.product.push(v)
        }
      });
    },
    changexbox () {
      if (this.productlist.every(v => v.checked == false)) {
        this.checkedall = false
      } if (this.productlist.every(v => v.checked == true)) {
        this.checkedall = true
      }
    },
    changebox () {
      this.productlist.forEach((v) => {
        v.checked = this.checkedall
      })
    },
    changenum (index, event) {
      this.productlist[index].cart_num = event
    },
    changeisdel () {
      this.$nextTick(() => {
        this.isdel = !this.isdel
      });
    },
    getproductlist () {
      this.axios.get('/cart/list', {
        headers: {
          'Authori-zation': 'Bearer ' + localStorage.getItem("token")
        }
      }).then(re => {
        this.productlist = re.data.data.valid
        this.checkedall = false
      })
    },
    delpro () {
      if (!localStorage.getItem("token")) {
        // 跳转到登陆页面
        this.$router.push({ name: "Login" });
        return;
      }
      // 删除之前把要删除的购物车id收集起来
      this.collection();
      if (this.delArr.length == 0) return
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
        .then(() => {
          Toast('删除成功')
          location.reload();
        })
        .catch(() => {
          Toast('删除失败')
        });
    }
  },
}
</script>

<style lang="less" >
.cart {
  .van-submit-bar {
    bottom: 43px;
  }
  .del {
    .van-submit-bar__button {
      width: 80px;
      height: 30px;
      color: #999;
      background: none;
      border: 1px solid #999;
    }
  }
  background: rgb(245, 245, 245);
  min-height: 92.5vh;
  .top {
    display: flex;
    padding: 0 15px;
    background: #f5f5f5;
    div {
      line-height: 38px;
      flex: 1;
      font-size: 12px;
      color: #8c8c8c;
      text-align: center;
      i {
        padding-right: 5px;
      }
    }
  }
  .sum {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 40px;
    background: white;
    .left {
      font-size: 14px;
      display: flex;
      h2 {
        padding-right: 2px;
      }
      h1 {
        color: #fc4141;
      }
    }
    span {
      font-size: 13px;
      padding: 5px 13px;
      border: 1px solid #868686;
      border-radius: 3px;
    }
  }
  .prolist {
    background: white;
    ul {
      li {
        padding: 12.5px 15px;
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          margin-right: 15px;
        }
        img {
          width: 80px;
          height: 80px;
        }
        .p-text {
          padding-left: 10px;
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          h1 {
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          h2 {
            font-size: 12px;
            color: #868686;
            margin-top: 10px;
          }
          .right {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
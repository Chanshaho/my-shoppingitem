<template>
  <div class="detail">
    <van-swipe @change="onChange">
      <van-swipe-item v-for="i in banner"
                      :key="i.id"
                      class="swiper">
        <img :src="i"
             alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="num">{{ current + 1 }}/{{banner.length}}</div>
      </template>
    </van-swipe>
    <div class="wrapper">
      <div class="top">
        <div class="tleft">
          <h2>
            <i class="money">￥</i>{{result.price}}
          </h2>
          <span>
            <i class="money">￥</i>{{result.vip_price}}
          </span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
               alt="">
        </div>
        <i class="fa fa-share-square-o"></i>
      </div>
      <p class="center">
        {{result.store_name}}
      </p>
      <div class="bottom">
        <span>原价:￥{{result.ot_price}}</span>
        <span>库存:{{result.stock}}{{result.unit_name}}</span>
        <span>销量:{{result.fsales}}{{result.unit_name}}</span>
      </div>
    </div>
    <div class="user">
      <h2>用户评价(0)</h2>
      <div class="right">
        <span>0%</span>
        <span>好评率</span>
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="select"
         @click="showaddCart=!showaddCart">
      <div class="sleft">
        <p>已选择：</p>
        <span v-for="(s,index) in selected"
              :key="index">
          {{s.name}}
        </span>
      </div>
      <i class="fa fa-angle-right"></i>
    </div>
    <h1 class="product">产品介绍</h1>
    <div class="description"
         v-html="result.description">
    </div>
    <van-sku v-model="showaddCart"
             :sku="sku"
             :goods="goods"
             :goods-id="goodsId"
             @add-cart="onAddCartClicked"
             :show-soldout-sku='false'
             ref=getSkuData
             @sku-selected="change"
             :initial-sku="initialSku" />
    <van-goods-action>
      <van-goods-action-icon icon="service-o"
                             text="客服" />
      <van-goods-action-icon icon="like-o"
                             text="收藏" />
      <van-goods-action-icon icon="cart-o"
                             text="购物车"
                             badge=""
                             @click="gotocart" />
      <van-goods-action-button type="danger"
                               @click="addCart"
                               color="darkorange"
                               text="加入购物车" />
      <van-goods-action-button type="danger"
                               text="立即购买"
                               @click="showaddCart=!showaddCart"
                               v-if="result.price!=0" />
      <van-goods-action-button type="danger"
                               text="已售罄"
                               color="#bbb"
                               disabled
                               v-else />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'

export default {

  beforeRouteLeave (to, from, next) {
    this.result = []
    this.banner = []
    next();
  },
  props: {
    id: {
      type: String,
    },
  },
  data () {
    return {
      current: 0,
      banner: [],
      result: [],
      product: [],
      showaddCart: false,
      selected: null,
      initialSku: { //默认选中
        s1: '30349',
        s2: '1193',
        selectedNum: 1
      },
      sku: {
        //初始化demo数据
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', //属性名称
            k_id: '1',//属性的ID值 唯一 在当前产品里面唯一
            v: [//颜色属性可用值列表
              {
                id: '30349',//属性ID
                name: '红色',//属性名
                //属性图片，默认只有第一行属性有
                imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png'
              },
              {
                id: '1215',
                name: '白色',
                imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png'
              }
            ],
            k_s: 's1',//属性的k_s值 对应list里面组合键名
          },
          {
            k: '尺码',
            k_id: '2',
            v: [
              {
                id: '1193',
                name: 'S'
              },
              {
                id: '1194',
                name: 'M'
              }
            ],
            k_s: 's2',
            count: 2
          }
        ],
        // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
        list: [
          {
            id: 2259,
            price: 120, //价格
            s1: '1215', //对应属性列表里面 k_s 等于s1的属性id值
            s2: '1193',
            stock_num: 20, //库存 
            goods_id: 946755 //产品ID
          },
          {
            id: 2260,
            price: 110,
            s1: '1215',
            s2: '1194',
            stock_num: 2,
            goods_id: 946755
          },
          {
            id: 2257,
            price: 130,
            s1: '30349',
            s2: '1193',
            stock_num: 40,
            goods_id: 946755
          },
          {
            id: 2258,
            price: 100,
            s1: '30349',
            s2: '1194',
            stock_num: 50,
            goods_id: 946755
          }
        ],
        price: '5.00',
        stock_num: 227, // 商品总库存
        none_sku: false,  // 是否无规格商品 
        hide_stock: false  // 是否隐藏剩余库存
      },
      goods: {},
      goodsId: 1

    }
  },
  created () {
    this.axios.get(`/product/detail/${this.id}`).then(result => {
      this.banner = result.data.data.storeInfo.slider_image
      this.result = result.data.data.storeInfo
      this.product = result.data.data
      this.sku.price = result.data.data.storeInfo.price
      this.sku.stock_num = result.data.data.storeInfo.stock
      let arrs = result.data.data.productAttr;
      let listValue = result.data.data.productValue;
      //sku 数据转换
      let id = 1;
      let idobj = {};
      let ssk = 1;
      this.sku.list = [];
      //获取产品属性里面第一个值默认图片
      this.goods.picture = result.data.data.storeInfo.image
      //循环产品属性 组装购物车 属性tree
      this.sku.tree = arrs.map((atr, ads) => {
        let va = atr.attr_value.map((at, index) => {
          id++;
          idobj[at.attr] = id;
          let attrs = {
            id: id,
            name: at.attr
          }
          if (ads < 1) {
            attrs.imgUrl = listValue[Object.keys(listValue)[index]].image
          }
          return attrs;
        })
        var ks = 's' + ssk;
        ssk++;
        return {
          k: atr.attr_name,
          k_id: atr.attr_name,
          v: va,
          k_s: ks
        }
      });
      //循环产品属性组合,组装sku 列表
      for (let key in listValue) {
        let v = listValue[key];
        let keys = key.split(',');
        this.sku.list.push({
          id: v.unique,
          price: v.price * 100, //价格
          s1: idobj[keys[0]],
          s2: idobj[keys[1]],
          stock_num: v.stock, //库存 
          goods_id: v.product_id,
          imgUrl: v.image
        });
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.axios.get(`/product/detail/${vm.id}`).then(result => {
        vm.banner = result.data.data.storeInfo.slider_image
        vm.result = result.data.data.storeInfo
        vm.product = result.data.data
        vm.sku.price = result.data.data.storeInfo.price
        vm.sku.stock_num = result.data.data.storeInfo.stock
        vm.goods.picture = result.data.data.storeInfo.image
        let arrs = result.data.data.productAttr;
        let listValue = result.data.data.productValue;
        //sku 数据转换
        let id = 1;
        let idobj = {};
        let ssk = 1;
        // this.sku.list = [];
        //获取产品属性里面第一个值默认图片
        vm.goods.picture = result.data.data.storeInfo.image
        //循环产品属性 组装购物车 属性tree
        vm.sku.tree = arrs.map((atr, ads) => {
          let va = atr.attr_value.map((at, index) => {
            id++;
            idobj[at.attr] = id;
            let attrs = {
              id: id,
              name: at.attr
            }
            if (ads < 1) {
              attrs.imgUrl = listValue[Object.keys(listValue)[index]].image
            }
            return attrs;
          })
          var ks = 's' + ssk;
          ssk++;
          return {
            k: atr.attr_name,
            k_id: atr.attr_name,
            v: va,
            k_s: ks
          }
        });
        //循环产品属性组合,组装sku 列表
        for (let key in listValue) {
          let v = listValue[key];
          let keys = key.split(',');
          vm.sku.list.push({
            id: v.unique,
            price: v.price * 100, //价格
            s1: idobj[keys[0]],
            s2: idobj[keys[1]],
            stock_num: v.stock, //库存 
            goods_id: v.product_id,
            imgUrl: v.image
          });
        }
      })
    });
  },
  methods: {
    onChange (index) {
      this.current = index; 8
    },
    addCart () {
      this.showaddCart = !this.showaddCart
    },
    // 获取sku或完成以后添加购物车执行的函数
    onAddCartClicked (ee) {
      // console.log("获取加购物车信息==->", ee);
      this.showaddCart = false;
      this.axios.post('/cart/add', {
        cartNum: ee.selectedNum,
        new: 0,
        productId: this.id,
        uniqueId: ee.selectedSkuComb
      }, {
        headers: {
          'Authori-zation': 'Bearer ' + localStorage.getItem("token")
        }
      }).then(re => {
        // console.log(re);
        if (re.data.status == 410000) {
          Dialog.alert({
            title: '登录提示',
            message: re.data.msg,
          }).then(() => {
            this.$router.push('/login')
          });
          // console.log('登录失败');

        } else {
          Toast('添加购物车成功')
          // console.log('登录成功');
        }
      })

    },
    change () {
      this.selected = this.$refs.getSkuData.selectedSkuValues
    },
    gotocart () {
      if (localStorage.getItem("token")) {
        this.$router.push('/cart')
      } else {
        Dialog.alert({
          title: '登录提示',
          message: '请登录',
        }).then(() => {
          this.$router.push('/login')
        });
      }
    },

  }
}
</script>

<style lang="less" scoped>
.detail {
  background-color: #f5f5f5;
  .swiper {
    img {
      display: block;
      width: 100%;
      height: 375px;
    }
  }
  .num {
    position: absolute;
    right: 16px;
    bottom: 16px;
    padding: 2px 5px;
    font-size: 12px;
    background-color: white;
  }
  .wrapper {
    background-color: white;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 15px 15px;
      .tleft {
        display: flex;
        font-weight: bold;
        align-items: center;
        i.money {
          font-size: 14px;
        }
        h2 {
          color: red;
          margin-right: 5px;
          font-size: 24px;
        }
        span {
          font-size: 14px;
          padding-top: 8px;
        }
        img {
          width: 23px;
          height: 10.5px;
          padding-top: 8px;
          margin-left: 3.5px;
        }
      }
      i.fa {
        color: #888;
      }
    }
    .center {
      font-weight: 700;
      font-size: 16px;
      margin: 0 15px;
    }
    .bottom {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        color: #888;
      }
    }
  }
  .select {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-top: 10px;
    height: 43px;
    align-items: center;
    padding: 0 15px;
    .sleft {
      display: flex;
      span {
        font-size: 14px;
        padding-left: 5px;
      }
      p {
        font-size: 14px;
        color: #888;
      }
    }
    i {
      color: #888;
      font-size: 20px;
    }
  }
  .user {
    padding: 0 15px;
    font-size: 14px;
    margin-top: 10px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 43px;
    .right {
      span {
        &:first-child {
          color: red;
        }
        &:nth-child(2) {
          color: #888;
          padding-right: 10px;
        }
      }
      i {
        font-size: 20px;
        color: #888;
      }
    }
  }
  h1 {
    line-height: 43px;
    text-align: center;
    margin-top: 10px;
    background-color: white;
    font-size: 16px;
  }
  .description {
    overflow: hidden;
    /deep/ li {
      font-size: 14px;
    }
    /deep/ img {
      display: block;
      width: 100vw;
    }
  }
}
</style>
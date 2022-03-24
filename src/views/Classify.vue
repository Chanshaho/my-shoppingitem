<template>
  <div class="category">
    <van-search shape="round"
                placeholder="搜索商品"
                @search="search"
                v-model="value"></van-search>

    <van-tabs class="categorys"
              scrollspy>
      <van-tab v-for="(cate, index) in categorys"
               :title="cate.cate_name"
               :key="index">
        <!-- v-slot:default 默认插槽，可以省略 插槽名称 -->
        <!-- <template v-slot:default> -->
        <div class="top_cate">
          <h2>
            <span>{{ cate.cate_name }}</span>
          </h2>
          <ul class="child_cate">
            <!-- 循环子分类 -->
            <router-link tag="li"
                         :to="{name:'Goods_list',query:{title:c.cate_name,id:c.id}}"
                         v-for="(c, i) in cate.children"
                         :key="i">
              <img :src="c.pic" />
              <h3>{{ c.cate_name }}</h3>
            </router-link>
          </ul>
        </div>
        <!-- </template> -->
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      categorys: [],
      // active:0
      value: ''
    };
  },
  created () {
    this.axios.get("/category").then((result) => {
      this.categorys = result.data.data;
    });
  },
  methods: {
    search () {
      this.$router.push({ path: '/goods_list', query: { s: this.value } })
    }
  },
};
</script>
<style lang="less">
.van-search {
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 5;
  background: #fff;
}
.categorys {
  // 重写vant的css代码
  padding: 0px;
  .van-tabs__wrap {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 90px;
    margin-top: 54px;
    height: 100vh;
    .van-tabs__nav {
      display: block;
      background: #f7f7f7;
      padding: 0px;
      .van-tab {
        padding: 0px;
        line-height: 40px;
      }
      .van-tab--active {
        color: red;
        border-left: 3px solid red;
        background: #fff;
      }
    }
  }
  .van-tabs__content {
    padding-left: 90px;
  }
  .top_cate {
    text-align: center;
    h2 {
      font-size: 14px;
      line-height: 45px;
      height: 45px;
      font-weight: bold;
      position: relative;
      text-align: center;
      z-index: 1;
      &::before {
        content: '';
        position: absolute;
        width: 70%;
        border-top: 2px solid #333;
        left: 50%;
        top: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
      }
      span {
        position: absolute;
        background: #fff;
        left: 50%;
        top: 50%;
        padding: 0px 20px;
        z-index: 2;
        transform: translate(-50%, -50%);
      }
    }
    h3 {
      font-weight: normal;
      font-size: 12px;
    }
    .child_cate {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 33%;
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>

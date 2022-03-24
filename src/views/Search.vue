<template>
  <div class="hot">
    <van-search shape="round"
                v-model="value"
                placeholder="点击搜索商品"
                @search="onsearch">
    </van-search>
    <div class="hotsearch">
      <h2>热门搜索</h2>
      <ul>
        <li v-for="(i,index) in hotsearch"
            :key="index">{{i}}</li>
      </ul>
    </div>
    <div class="line"></div>
    <no-search></no-search>
  </div>
</template>

<script>
import NoSearch from '../components/NoSearch.vue';
export default {
  components: { NoSearch },
  data () {
    return {
      value: '',
      hotsearch: [],
    }
  },
  methods: {
    onsearch () {

    }
  },
  created () {
    this.axios.get("/search/keyword").then(result => {
      this.hotsearch = result.data.data
    });
  },
}
</script>

<style lang="less" scoped>
.hot {
  .hotsearch {
    margin-top: 20px;
    padding-left: 15px;
    h2 {
      font-size: 14px;
      color: #888;
      margin-bottom: 15px;
    }
    ul {
      display: flex;
      li {
        line-height: 28px;
        font-size: 13px;
        padding: 0 10.5px;
        border: 1px solid #aaa;
        text-align: center;
        margin-right: 10px;
      }
    }
  }
  .line {
    border-bottom: 1px solid #eee;
    padding-top: 20px;
    margin: 0 15px;
  }
}
</style>
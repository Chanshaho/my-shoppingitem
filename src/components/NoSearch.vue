<template>
  <div class="nosearch">
    <div class="img">
      <img src="http://47.115.51.185/h5/img/noGood.7aec7edd.png"
           alt="">
    </div>
    <div class="title">
      <div class="text">
        <h2>为你推荐</h2>
      </div>
      <div class="line"></div>
    </div>
    <div class="items">
      <router-link class="item"
                   tag="div"
                   :to="`/detail/${i.id}`"
                   v-for="(i,index) in bestlist"
                   :key="index">
        <img :src="i.image"
             alt="">
        <div class="name">{{i.store_name}}</div>
        <div class="price">
          <i>￥</i>
          <span>{{i.price}}</span>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState([
      'bestlist',
    ])
  },
  methods: {
    ...mapActions([
      'Productlist',
    ])
  },
  mounted () {
    this.Productlist()
  },
}
</script>

<style lang="less" scoped>
.nosearch {
  background: white;
  .img {
    padding: 20px 0;
    img {
      display: block;
      width: 207px;
      height: 168px;
      margin: 0 auto;
    }
  }
  .title {
    position: relative;
    .text {
      line-height: 67.5px;
      width: 100px;
      margin: 0 auto;
      background-color: white;
      h2 {
        height: 100%;
        text-align: center;
        font-size: 14px;
      }
    }
    .line {
      height: 0.5px;
      background-color: #aaa;
      width: 60vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
    .item {
      flex: 1;
      width: 168px;
      margin-bottom: 15px;
      img {
        width: 167.5px;
        height: 167.5px;
        border-radius: 5px;
      }
      .name {
        margin-top: 10px;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        color: #fc4141;
        line-height: 17px;
        i {
          font-size: 12px;
        }
        span {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
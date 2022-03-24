<template>
  <div class="hotnewgoods">
    <van-swipe @change="onChange"
               class="swiper"
               :width="375"
               :autoplay="3000">
      <van-swipe-item v-for="i in bestbanner"
                      :key="i.id">
        <router-link to=""
                     tag="div">
          <img :src="i.img"
               alt="">
        </router-link>
      </van-swipe-item>
      <template #indicator>
        <ul class="custom-indicator">
          <li v-for="i in bestbanner.length"
              :key="i"
              :class="{ active: i-1  == current }"></li>
        </ul>
      </template>
    </van-swipe>
    <div class="box">
      <div class="xbox">
        <i class="fa fa-diamond"></i>
        <span>精品推荐</span>
      </div>
      <div class="line"></div>
    </div>
    <img-item :bestlist="bestlist"></img-item>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ImgItem from '@/components/ImgItem.vue';

export default {
  props: ['id'],
  components: { ImgItem },
  data () {
    return {
      current: 0, text: ''
    }
  },
  computed: {
    ...mapState(['bestbanner', 'bestlist'])
  },
  methods: {
    onChange (index) {
      this.current = index;
    },
    ...mapActions(['Productlist'])
  },
  mounted () {
    this.Productlist()
  },
}
</script>

<style lang="less" scoped>
.hotnewgoods {
  .swiper {
    width: 100vw;
    position: relative;
    img {
      display: block;
      width: 100vw;
      height: 141px;
    }
    .custom-indicator {
      position: absolute;
      bottom: 9px;
      right: 20px;
      display: flex;
      li {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        border: 1px solid white;
        margin-left: 6px;
        &.active {
          background: red;
          width: 6px;
          height: 6px;
          border: none;
        }
      }
    }
  }
  .box {
    z-index: -2;
    line-height: 60px;
    width: 100vw;
    background: #f5f5f5;
    color: #282828;
    position: relative;
    .xbox {
      text-align: center;
      background: #f5f5f5;
      width: 100px;
      margin: 0 auto;
      font-size: 16px;
      span {
        padding-left: 5px;
      }
    }
    .line {
      z-index: -1;
      height: 0.5px;
      width: 90vw;
      background-color: #ddd;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
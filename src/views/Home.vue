<template>
  <div class="home">
    <van-search shape="round"
                v-model="value"
                placeholder="搜索商品"
                @focus="search">
      <template v-slot:left>
        <img class="logo"
             v-if="result"
             src="@/assets/image/qie.png" />
      </template>
    </van-search>
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white"
               @change="changeBannber">
      <van-swipe-item v-for="b in banner"
                      :key="b.id">
        <router-link :to="b.url"
                     tag="div">
          <img :src="b.pic">
        </router-link>
      </van-swipe-item>
      <template v-slot:indicator>
        <ul class="indicator">
          <li v-for="i in banner.length"
              :key="i"
              :class="{ currentItem: i - 1 == index }">
            {{ i }}
          </li>
        </ul>
      </template>
    </van-swipe>
    <van-grid class="grid"
              v-if="result"
              :border="false">
      <van-grid-item v-for="item in result.menus"
                     :key="item.id"
                     :text="item.name"
                     :url="item.url">
        <template #icon>
          <img :src="item.pic"
               class="grid-item-icon" />
        </template>
      </van-grid-item>
    </van-grid>
    <van-notice-bar :scrollable="false"
                    background="#fff"
                    v-if="result"
                    class="scroll-notice">
      <van-swipe vertical
                 class="notice-swipe"
                 :autoplay="3000"
                 :show-indicators="false">
        <van-swipe-item v-for="i in result.roll"
                        :key="i.id">
          <div class="scrollitem">
            <span>{{ i.info }}</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </van-swipe-item>
      </van-swipe>
      <template #left-icon>
        <img class="notice-left-icon"
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAcCAYAAACj6tvkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVEMDQxOUYxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVEMDQxOUUxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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" />
      </template>
    </van-notice-bar>
    <list-title path="classify">快速选择</list-title>
    <van-swipe :loop="false"
               :show-indicators="false"
               v-if="result"
               :width="90"
               class="imgitem">
      <van-swipe-item v-for="i in fastlist"
                      :key="i.id">
        <router-link :to="{name:'Goods_list',query:{title:i.cate_name,id:i.id}}"
                     tag="div">
          <img :src="i.pic">
          <div class="bottom">{{i.cate_name}}</div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <list-title path="hot_new_goods/1">精品推荐</list-title>
    <van-swipe @change="onChange"
               class="my-swipetwo"
               :width="345"
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
    <img-item :bestlist="bestlist"></img-item>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ListTitle from '@/components/ListTitle.vue';
import ImgItem from '@/components/ImgItem.vue';
export default {
  components: { ListTitle, ImgItem },
  name: 'Home',
  data () {
    return {
      value: '',
      index: 0,
      current: 0
    };
  },

  computed: {
    ...mapState(['banner', 'result', 'fastlist', 'bestbanner', 'bestlist'])
  },
  methods: {
    changeBannber (index) {
      this.index = index
    },
    search () {
      this.$router.push("/search")
    },
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
<style lang="less">
.home {
  .van-search {
    padding: 7px 20px;
    .logo {
      padding-right: 10px;
      height: 50px;
    }
  }
}
.my-swipetwo {
  margin: 0 auto;
  width: 92vw;
  margin-top: 15px;
  img {
    display: block;
    width: 100%;
    height: 130px;
  }
  .custom-indicator {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    li {
      width: 3.5px;
      height: 3.5px;
      border-radius: 50%;
      background: #fc4141;
      margin-left: 5px;
      opacity: 0.3;
      &.active {
        opacity: 1;
        width: 10px;
        border-radius: 10px;
      }
    }
  }
}
.imgitem {
  text-align: center;
  padding: 0 15px 18.5px;
  margin-top: 19px;
  width: 90vw;
  .van-swipe-item {
    margin-right: 9.5px;
    height: 122px;
    border-bottom: 1px solid red;
    img {
      display: block;
      width: 100%;
      height: 90px;
    }
    .bottom {
      font-size: 14px;
      width: 100%;
      line-height: 30px;

      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
    }
  }
}
.notice-swipe {
  height: 37px;
  line-height: 37px;
}
.logo {
  width: 62px;
  height: 22px;
}
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 190px;
    display: block;
  }
}
.indicator {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  display: flex;
  li {
    text-indent: -9999px;
    margin-right: 5px;
    width: 10px;
    height: 2px;
    background: rgba(255, 255, 255, 1);
    &.currentItem {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
.grid {
  .grid-item-icon {
    width: 45px;
    height: 45px;
  }
}
.scroll-notice {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 0px 10px #eee;
  .notice-left-icon {
    width: 62px;
  }
  .van-notice-bar__content.van-ellipsis {
    width: 100%;
  }
  .scrollitem {
    padding-left: 20px;
    color: #333;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      text-align: left;
    }
    i {
      width: 10px;
    }
  }
}
</style>

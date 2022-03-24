<template>
  <div class="orderList">
    <div v-if="!orderlist||orderlist.length==0">
      <img class="nolist"
           src="../assets/image/noorder.png">
    </div>
    <div class="listItem"
         v-else
         v-for="item in orderlist"
         :key="item.id">
      <div class="list">
        <span>{{item._add_time}}</span>
        <i>{{item._status._title}}</i>
      </div>
      <van-card :num="item.cartInfo[0].cart_num"
                :price="item.cartInfo[0].productInfo.cost"
                :title="item.cartInfo[0].productInfo.store_name"
                :thumb="item.cartInfo[0].productInfo.image" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderlist: null,
    };
  },
  created () {
    this.axios
      .get("/order/list?page=1&limit=20&type=" + this.$route.params.listid, {
        headers: {
          "Authori-zation": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(re => {
        this.orderlist = re.data.data;
      });
  },

  beforeRouteUpdate (to, from, next) {
    this.page = to.params.listid;
    this.orderlist = [];
    this.axios
      .get("/order/list?page=1&limit=20&type=" + to.params.listid, {
        headers: {
          "Authori-zation": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(re => {
        this.orderlist = re.data.data;
      });
    next();
  },
};
</script>

<style lang="less">
.orderList {
  margin-top: 10px;
  background-color: #eee;
  min-height: 65vh;
  .nolist {
    width: 100%;
  }
  .nolist {
    margin: 35px 90px;
    display: block;
    width: 200px;
    height: 150px;
  }
  .listItem {
    margin: 10px 15px;
    .list {
      font-size: 14px;
      padding: 10px 0px 0px 10px;
      line-height: 20px;
      background-color: #fff;
      display: flex;
      span {
        flex: 1;
      }
      i {
        width: 80px;
        text-align: center;
        color: rgb(233, 51, 35);
      }
    }
    .van-card {
      margin: 0px;
    }
  }
}
</style>


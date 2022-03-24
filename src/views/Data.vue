<template>
  <div class="data">
    <div class="manage">
      <h3>管理我的账号</h3>
      <div class="user">
        <ul>
          <li><img :src="loginuser.avatar"><i class="fa fa-pencil-square-o"
               aria-hidden="true"></i></li>
          <li>
            <h4>{{loginuser.nickname}}</h4>
            <span>绑定手机号: {{loginuser.phone}}</span>
          </li>
          <li>当前账号</li>
        </ul>
      </div>
    </div>
    <div class="nickname">
      <van-form>
        <van-field v-model="username"
                   name="昵称"
                   label="昵称"
                   :placeholder="loginuser.nickname"
                   @focus="setname" />
        <van-field v-model="userid"
                   name="ID号"
                   label="ID号"
                   :placeholder="String(loginuser.uid)"
                   :readonly='true'
                   right-icon="lock" />
        <van-field v-model="phone"
                   name="手机号码"
                   label="手机号码"
                   :placeholder="loginuser.phone"
                   :readonly='true'
                   right-icon="lock" />
        <van-cell title="密码"
                  is-link
                  value="点击下修改密码" />
        <div class="preserveBtn">
          <van-button color="rgb(233,51,35)"
                      round
                      block
                      type="info"
                      native-type="submit">
            保存修改
          </van-button>
        </div>
        <div class="btnOut">
          <van-button round
                      block
                      plain
                      type="info"
                      color="rgb(233,51,35)"
                      @click="logout">
            退出登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data () {
    return {
      username: null,
      userid: null,
      phone: null
    }
  },

  methods: {
    ...mapMutations(["loginout"]),
    logout () {
      this.loginout();
      this.$dialog({
        title: "退出登录",
        message: "退出成功"
      }).then(() => {
        this.$router.push('/');
      })
    },
    setname () {
      let text = this.loginuser.nickname;
      console.log(text);
      // value=text;
      this.username = text;
    }
  },
  computed: {
    ...mapGetters(["loginuser"])
  }
};
</script>

<style lang="less">
.data {
  width: 100vw;
  height: 91.5vh;
  background: #f5f5f5;
  .manage {
    margin: 5px 0px;
    background: #fff;
    height: 140px;
    h3 {
      font-size: 16px;
      padding: 10px 0px 10px 20px;
    }
    .user {
      height: 80px;
      margin: 10px 20px;
      // background: no-repeat url('../assets/image/data_bj.png');
      background-size: 100% 100%;
      background-color: #fff9f9;
      border: 1px solid rgb(240, 109, 102);
      border-radius: 10px;
      ul {
        display: flex;
        padding-top: 15px;
        position: relative;

        li {
          &:first-child {
            position: relative;
            img {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              margin-left: 10px;
            }
            .fa-pencil-square-o {
              display: block;
              width: 15px;
              height: 15px;
              position: absolute;
              bottom: 2px;
              right: 0px;
              font-size: 15px;
              color: red;
              background: #fff;
              border-radius: 5px;
            }
          }
          &:nth-child(2) {
            flex: 1;
            margin-left: 10px;
            h4 {
              font-size: 15px;
              color: #333;
              padding-top: 8px;
            }
            span {
              font-size: 12px;
              color: #999;
            }
          }
          &:nth-child(3) {
            position: absolute;
            line-height: 20px;
            padding: 0px 5px;
            color: #fc4141;
            background: rgba(233, 51, 35, 0.1);
            top: 0px;
            right: 0px;
            font-size: 13px;
            border-radius: 0px 10px 0px 10px;
          }
        }
      }
    }
  }
  .nickname {
    .van-field__label {
      width: auto;
    }
    .van-field__control {
      text-align: right;
    }
  }
  .preserveBtn {
    margin: 30px 16px 0px 16px;
  }
  .btnOut {
    margin: 16px;
    // background: #fff;
    // color: rgb(233,51,35);
  }
}
</style>

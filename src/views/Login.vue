<template>
  <div class="login">
    <van-tabs>
      <van-tab title="账号登录">
        <van-form @submit="loginByPassword">
          <van-field v-model.number="account"
                     name="account"
                     placeholder="请输入手机号"
                     :rules="[{ required: true, message: '请输入手机号',trigger:'onChange' },
                     {pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,message: '手机格式错误',trigger:'onChange' }]">
            <template v-slot:left-icon>
              <i class="fa fa-mobile"></i>
            </template>
          </van-field>
          <van-field v-model="password"
                     type="password"
                     name="password"
                     placeholder="请输入密码"
                     :rules="[{ required: true, message: '请输入密码',trigger:'onChange' }]">
            <template v-slot:left-icon>
              <i class="fa fa-lock"></i>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="info"
                        native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="快速登录">
        <van-form @submit="loginByCode">
          <van-field v-model="account"
                     name="account"
                     placeholder="请输入手机号"
                     :rules="[{ required: true, message: '请输入手机号',trigger:'onChange' },
                     {pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,message: '手机格式错误',trigger:'onChange' }]">
            <template v-slot:left-icon>
              <i class="fa fa-mobile"></i>
            </template>
          </van-field>
          <van-field v-model="verfycode"
                     type="verfycode"
                     name="verfycode"
                     placeholder="填写验证码"
                     :rules="[{ required: true, message: '填写验证码',trigger:'onChange' },]">
            <template v-slot:left-icon>
              <i class="fa fa-lock"></i>
            </template>
            <template #button>
              <van-button size="small"
                          type="primary"
                          native-type="button"
                          @click="sendCode"
                          :disabled="issend">{{!issend?'发送验证码':counter+'秒之后继续发送'}}</van-button>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="info"
                        native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      account: '',
      password: '',
      verfycode: '',
      sendkey: '',
      counter: 60,
      timeid: null,
      issend: false
    }
  },
  created () {
    this.axios.get('/verify_code').then(r => {
      this.sendkey = r.data.data.key
    })
  },
  methods: {
    ...mapActions(["getuserInfo"]),
    ...mapMutations(["saveToken"]),
    loginByPassword (event) {
      // console.log(event);
      this.axios.post("/login", event).then(result => {
        // console.log(result);
        if (result.data.status == 400) {
          Dialog.alert({
            title: '登录提示',
            message: result.data.msg,
          }).then(() => {
          });
          // console.log('登录失败');

        } else {
          this.saveToken(result.data.data.token)
          Dialog.alert({
            title: '登录提示',
            message: result.data.msg,
          }).then(() => {
            this.getuserInfo()
            this.$router.back()
          });
          // console.log('登录成功');

        }
      })
    },
    sendCode () {
      if (!this.account || this.account.length != 11) {
        this.$toast('手机号码不能为空且长度为11位');
      }
      this.axios.post('/register/verify', {
        code: '',
        key: this.sendkey,
        phone: this.account,
        type: 'login'
      }).then(result => {
        if (result.data.status == 200) {
          this.issend = true
          this.$toast.success(result.data.msg)
          this.timeid = setInterval(() => {
            if (this.counter == 0) {
              this.issend = false
              clearInterval(this.timeid)
              return
            }
            this.counter--
          }, 1000);
        } else {
          this.$toast.fail(result.data.msg)
        }
      })
    },
    loginByCode (event) {
      this.axios.post('login/mobile', {
        phone: event.account,
        captcha: event.verfycode,
        spread: null
      }).then(re => {
        console.log(re.data);
        if (re.data.data.token) {
          this.saveToken(re.data.data.token)
          this.$toast.success({
            message: re.data.msg,
            onClose: () => {
              this.getuserInfo()
              this.$router.back();
            }
          })
        } else {
          this.$toast.fail(re.data.msg)
        }
      })
    }
  },
}
</script>

<style lang="less">
.login {
  i {
    color: #ccc;
    &.fa-mobile {
      font-size: 24px;
    }
    &.fa-lock {
      font-size: 18px;
    }
  }
  .van-cell__value {
    padding-left: 15px;
  }
  .van-button--info {
    background: linear-gradient(90deg, #f35447 0, #ff8e3c);
    border: none;
  }
  .van-button--small {
    padding: 0 5px;
    border-radius: 20px;
    background: #f35446;
    border: none;
    height: 25px;
  }
}
</style>
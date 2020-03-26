<template>
  <div>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <div class="login">
      <div class="login-bt">
        <mt-button type="primary" size="small" @click="Login">登录</mt-button>
      </div>
      <div class="login-bt">
        <mt-button type="danger" size="small">返回</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      password: "",
      phone: ""
    };
  },
  methods: {
    async Login() {
      Indicator.open("登陆中...");
      try {
        const { account, code, message } = await this.$axios({
          methods: LBP.type,
          url: LBP.url,
          params: {
            phone: this.phone,
            password: this.password
          }
        });
        Indicator.close();
        if (code !== 200) {
          Toast({
            message: message,
            position: "center",
            duration: 2000
          });
          return;
        }
        // this.getUserInfoAction(account.id)
        this.$store.dispatch("getUserInfoAction", account.id);
        this.$router.push({ path: "/" });
      } catch (e) {
        Indicator.close();
        Toast({
          message: "未知错误",
          position: "center",
          duration: 2000
        });
        console.log(e);
      }
    },
    Back() {
      this.$router.push({ path: "/" });
    },
    
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
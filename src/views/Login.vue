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
import { LBP } from "@/api/index";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      password: "",
      phone: ""
    };
  },
  methods: {
    async Login() {
      Indicator.open('登陆中...');
      try {
        const { account } = await this.$axios({
          methods: LBP.type,
          url: LBP.url + `?phone=${this.phone}&password=${this.password}`
        });
        this.$store.dispatch("getUserInfoAction",account.id)
        Indicator.close();
        this.$router.push({ path: "/" });
      } catch (e) {
        console.log(e);
      }
    },
    Back() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
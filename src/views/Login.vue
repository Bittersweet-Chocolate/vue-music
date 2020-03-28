<template>
  <section class="login">
    <header class="login-navBar">
      <router-link to="/" class="navBar-icon">
        <i class="mintui mintui-back"></i>
      </router-link>
    </header>
    <section class="login-scrollView">
      <div class="login-bg">
        <img src="../assets/img/loginBg.png" />
      </div>
      <transition 
      enter-active-class="animated bounceInDown" 
      appear
      >
        <div class="login-form" v-show="code">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <div class="login-bt">
            <mt-button class="bt-green" size="large" @click="Login">登录</mt-button>
          </div>
          <div class="login-ch">
            <span class="fs-sm" @click="code = !code">手机验证码登录</span>
          </div>
        </div>
      </transition>
      <transition
        enter-active-class="animated bounceInDown"
      >
        <div class="login-form" v-show="!code">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="password"></mt-field>
          <div class="login-bt">
            <mt-button class="bt-green" size="large" @click="Login">登录</mt-button>
          </div>
          <div class="login-ch">
            <span class="fs-sm" @click="code = !code">账号密码登录</span>
          </div>
        </div>
      </transition>
    </section>
  </section>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      password: "",
      phone: "",
      code: true
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
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
      <transition enter-active-class="animated bounceInDown" appear>
        <login-card class="login-form">
          <h2 class="fs-sm">账号密码登录</h2>
          <div class="mb-4">
            <mt-field class="test" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          </div>
          <div class="login-bt">
            <mt-button class="bt-green" size="large" @click="Login">登录</mt-button>
          </div>
        </login-card>
      </transition>
      <!-- <transition enter-active-class="animated bounceInDown">
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
      -->
    </section>
    <div class="login-box">
      <h2>其它登录方式</h2>
    </div>
    <div class="login-palace">
      <a href="javascript:;" class="palace-grid" @click="this.$utils.getMore">
        <div class="grid-icon">
          <img src="../assets/img/login-wx.png" alt />
        </div>
        <div class="grid-text">
          <h2>微信</h2>
        </div>
      </a>
      <a href="javascript:;" class="palace-grid" @click="this.$utils.getMore">
        <div class="grid-icon">
          <img src="../assets/img/login-sj.png" alt />
        </div>
        <div class="grid-text">
          <h2>手机验证码</h2>
        </div>
      </a>
      <a href="javascript:;" class="palace-grid" @click="this.$utils.getMore">
        <div class="grid-icon">
          <img src="../assets/img/login-qq.png" alt />
        </div>
        <div class="grid-text">
          <h2>腾讯</h2>
        </div>
      </a>
    </div>
  </section>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      password: "",
      phone: "",
      code: true,
      message: ""
    };
  },
  methods: {
    async Login() {
      if (!this.checkText()) {
        Toast({
          message: this.message,
          position: "center",
          duration: 2000
        });
        return;
      }
      Indicator.open("登陆中...");
      try {
        const { code, account, message, profile } = await this.$api.login({
          phone: this.phone,
          password: this.password
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
        this.getUserInfoAction(account.id);
        this.$router.push({ path: "/" });
      } catch (e) {
        Indicator.close();
        Toast({
          message: "未知错误",
          position: "center",
          duration: 2000
        });
      }
    },
    // 检测手机号
    checkText() {
      const phone = this.phone.replace(/\s+/g, "");
      const psw = this.password.length;
      if (phone.length === 0 || psw === 0) {
        this.message = "请填写正确";
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.message = "手机号有误";
        return false;
      }
      return true;
    },

    Back() {
      this.$router.push({ path: "/" });
    },
    setToken() {
      // document.cookie = "key=value";
    },
    ...mapActions(["getUserInfoAction"])
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
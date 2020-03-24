<!--头部公共区域 推荐+排行tab栏  -->
<template>
  <div>
    <div class="header p-3 pb-0 shadow">
      <!-- logo条 -->
      <div class="logo d-flex jc-center ai-center">
        <!-- 左 -->
        <div class="logo-box bg-white">
          <img src="../assets/img/logo.svg" alt />
        </div>
        <!-- 中 -->
        <div class="logo-title flex-1 ml-2">
          <p class="fs-lg mb-1">QQ音乐</p>
          <p class="fs-ssm text-grey">打开APP收藏下载</p>
        </div>
        <!-- 右 -->
        <div v-if="!userInfo.level">
          <a href="#" @click="Login" class="logo-button btn-qq fs-ssm px-3 text-grey">登录</a>
        </div>
        <div v-else class="flex-1 flex-right d-flex">
          <img :src="userInfo.profile.avatarUrl" width="23%" />
        </div>
      </div>
      <!-- tab栏 -->
      <div class="nav d-flex fs-lg text-grey text-center">
        <router-link tag="div" to="/" exact-active-class="active">推荐</router-link>
        <router-link tag="div" to="/rank" exact-active-class="active">排行</router-link>
      </div>
    </div>
    <!-- 路由占位符 使用过渡效果 -->

    <transition mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>

    <!-- 底部 -->
    <footer class="d-flex flex-column ai-center mt-5">
      <div class="fot">
        <img src="../assets/img/logo_ch.svg" alt class="h-100" />
      </div>
      <div class="mt-2 text-grey fs-ssm text-center pb-5">
        <p>Copyright © 1998 - 2020 Tencent. All Rights Reserved.</p>
        <p>联系邮箱：810753596@qq.com QQ：810753596</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      current: 0
    };
  },
  mounted() {
    if (this.isMobile()) {
    } else {
    }
    this.getTagListAction();
  },
  methods: {
    Login() {
      this.$router.push({ path: "/login" });
    },

    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    ...mapActions(["getMusicListAction", "getTagListAction"])
  },
  computed: {
    ...mapState(["userInfo", "tagList"])
  }
};
</script>
<style lang="scss" scope >
/* @import url(); 引入css类 */
@import "../assets/css/main.scss";
</style>

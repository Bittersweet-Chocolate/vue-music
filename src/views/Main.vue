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
          <router-link to="/login" tag="a" class="logo-button btn-qq fs-ssm px-3 text-grey">登录</router-link>
        </div>
        <div v-else class="flex-1 flex-right d-flex">
          <img :src="userInfo.profile.avatarUrl" width="23%" />
        </div>
      </div>
      <!-- tablebar -->
      <div class="nav d-flex fs-lg text-grey text-center">
        <router-link tag="div" to="/" exact-active-class="active">推荐</router-link>
        <router-link tag="div" to="/rank" exact-active-class="active">排行</router-link>
      </div>
    </div>

    <router-view />

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <login-card class="popup">
        <div class="pb-3" style="text-align:center;">
          <h4 class="mb-2">手机体验更佳！</h4>
          <span class="text-grey fs-sm">可以使用手机浏览器扫码</span>
        </div>
        <img src="../assets/img/showPhone.png" width="200px" height="200px" />
      </login-card>
    </mt-popup>

    <!-- 底部 -->
    <footer class="d-flex flex-column ai-center pt-5">
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
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      popupVisible: false
    };
  },
  mounted() {
    // this.showImg();
  },
  methods: {
    showImg() {
      let res = sessionStorage.getItem("popupVisible");
      if (res) {
        res = JSON.parse(res);
        this.popupVisible = res.popupVisible;
        return;
      }
      if (!this.isMobile()) {
        this.popupVisible = true;
        sessionStorage.setItem("popupVisible", JSON.stringify(false));
      }
    },

    // 是否手机登录
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style lang="scss" scope >
/* @import url(); 引入css类 */
@import "../assets/css/main.scss";
</style>

<!--  -->
<template>
  <div>
    <div class="d-flex p-2 px-4 ai-center border-bottom">
      <div class="logo">
        <img src="../assets/img/logo.svg" alt class="h-100" />
      </div>
      <div class="flex-1 pl-2 top-text">更多QQ音乐排行榜</div>
      <router-link tag="a" to="/rank" class="backRank text-grey">戳我查看</router-link>
    </div>
    <section class="d-flex flex-column jc-center ai-center mt-3">
      <div class="imgbox mb-4">
        <img :src="topInfo.coverImgUrl" alt class="h-100" />
      </div>
      <div class="pt-1 text-center">
        <h3 class="pb-3">{{topInfo.name}}</h3>
        <p class="up-time text-len text-grey fs-sssm">更新时间: {{topInfo.trackUpdateTime | formdata}}</p>
      </div>
      <div>
        <div class="iconfont icon-bofangsanjiaoxing bofang mt-3"></div>
      </div>
    </section>
    <section class="px-3 pt-3">
      <p class="text-grey fs-sssm">排行榜 共{{topInfo.trackCount}}首</p>
      <ol>
        <!-- <transition-group enter-active-class="animated flash" appear> -->
        <li
          v-for="(item,index) in topInfo.tracks"
          :key="index"
          class="d-flex p-3 pb-2"
          @click="playMusic(item.id,index)"
          :style="delay"
        >
          
            <span
              class="mr-3"
              :class="index<3?'text-chinaRed':'text-grey'"
              style="padding-top:0.1rem"
            >{{index+1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span
              v-for="(item1,index1) in item.ar"
              :key="index1"
              class="text-grey pt-1 fs-sssm"
            >{{item1.name | addLines(item.ar)}}</span>
          </div>
        </li>
        <!-- </transition-group> -->
      </ol>
    </section>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      topInfo: {},
      color: "text-chinaRed",
      delay:"animated-delay:2s"
    };
  },
  props: ["topId"],
  mounted() {
    this.getMusicTop(this.topId);
  },
  methods: {
    async getMusicTop(idx) {
      Indicator.open("加载中...");
      let res = await this.$api.getRankList({ idx: idx });
      if (res.code === 200) {
        Indicator.close();
        this.topInfo = res.playlist;
      }
    },
    playMusic(id, idx) {
      // 点击歌曲详情进入播放页
      this.$router.push({ name: "musicPlay", params: { id: id } });
    }
  },
  computed:{
    // delay(idx){
    //   return `animate-delay:${idx}s`
    // }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
@import url("../assets/css/mTop.scss");
</style>

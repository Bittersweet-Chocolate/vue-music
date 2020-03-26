<!--  -->
<template>
  <div>
    <!-- 顶部盒子 -->
    <div class="d-flex p-2 px-4 ai-center border-bottom">
      <div class="logo">
        <img src="../assets/img/logo.svg" alt class="h-100" />
      </div>
      <div class="flex-1 pl-2 top-text">更多QQ音乐排行榜</div>
      <a class="backRank text-grey" @click="$router.go(-1)">返回</a>
    </div>
    <!-- <section class="d-flex p-3 ai-center bg-white shadow">
      <div class="imgBox">
        <img src="../assets/img/logo.svg" alt="" class="h-100">
      </div>
      <div class="px-3 flex-1">
        <p class="fs-lg pb-1">你的好友</p>
        <span class="text-grey ">在用QQ音乐邀你一起</span>
      </div>
      <div class="buttonDiv text-grey" @click="$router.go(-1)">返回</div>
    </section>-->
    <!-- 标题盒子 -->
    <section class="d-flex flex-column ai-center jc-center mt-4 text-center">
      <div class="title mb-3 mt-1">
        <h2 class="titleH pb-3">{{songsInfo.name}}</h2>
        <span
          class="fs-m text-grey"
          v-for="(data,index) in songsInfo.ar"
          :key="index"
        >{{data.name | addLines(songsInfo.ar,'hor')}}</span>
      </div>
      <div class="titleimg box-shadow">
        <img v-lazy="songsInfo.url" alt class="h-100" />
      </div>
      <div class="play mt-4 pt-1">
        <a href="#" class="iconfont icon-icon_xinyong_xianxing_jijin-"></a>
        <a href="#" class="iconfont icon-bofangsanjiaoxing" @click="startMusic" v-if="isStart"></a>
        <a href="#" class="iconfont icon-zanting" @click="stopMusic" v-else></a>
        <a href="#" class="iconfont icon-aixin"></a>
      </div>
      <div class="pt-4 downMs">
        <a href="#" class="bg-info">下载歌曲</a>
      </div>
      <div>
        <audio :src="musicUrl" ref="audio"></audio>
      </div>
    </section>
  </div>
</template>

<script>
import { Lazyload, Indicator } from "mint-ui";
export default {
  props: ["id"],
  data() {
    return {
      musicUrl: "",
      isStart: true,
      songsInfo: {}
    };
  },
  mounted() {
    this.getMusicUrl();
    this.getMusicinfo();
  },
  methods: {
    // 获取歌曲地址
    async getMusicUrl() {
      const res = await this.$api.getSong({ id: this.id });
      this.musicUrl = res.data[0].url;
    },

    // 控制播放
    startMusic() {
      this.isStart = false;
      this.$refs.audio.play();
    },
    stopMusic() {
      this.isStart = true;
      this.$refs.audio.pause();
    },

    // 获取歌曲图片 名称 信息
    getMusicinfo() {
      let res = localStorage.getItem("songInfo");
      if (res) {
        res = JSON.parse(res);
        this.songsInfo = res;
      }
    }
  },
  beforeDestroy() {
    localStorage.removeItem("songInfo");
  }
};
</script>
<style  scoped>
.buttonDiv {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
}
.imgBox {
  height: 52px;
}
.titleH {
  font-weight: normal;
}
.titleimg {
  height: 230px;
}
.play a {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  position: relative;
  margin: 0 20px;
}
.play a::before {
  position: absolute;
  font-size: 20px;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
}

.downMs a {
  display: block;
  height: 3rem;
  width: 18rem;
  line-height: 3rem;
  font-size: 18px;
  color: #fff;
  border-radius: 20px;
}
</style>

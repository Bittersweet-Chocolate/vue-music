<!--  -->
<template>
  <div>
    <!-- 顶部盒子 -->
    <div class="d-flex p-2 px-4 ai-center border-bottom">
      <div class="logo">
        <img src="../assets/img/logo.svg" alt class="h-100" />
      </div>
      <div class="flex-1 pl-2 top-text">更多QQ音乐排行榜</div>
      <transition enter-active-class="animated fadeIn" appear>
        <a class="backRank text-grey" @click="$router.go(-1)">返回</a>
      </transition>
    </div>
    <section class="d-flex flex-column ai-center jc-center mt-4 text-center">
      <div class="title mb-3 mt-1">
        <h2 class="titleH pb-3">{{songsInfo.name}}</h2>
        <span
          class="fs-m text-grey"
          v-for="(data,index) in songsInfo.ar"
          :key="index"
        >{{data.name | addLines(songsInfo.ar,'hor')}}</span>
      </div>
      <transition enter-active-class="animated flipInY" appear>
        <div class="titleimg box-shadow">
          <img :src="songsInfo.picUrl" alt class="h-100" />
        </div>
      </transition>
      <div class="play mt-4 pt-1">
        <p class="iconfont icon-icon_xinyong_xianxing_jijin-" @click="this.$utils.getMore"></p>
        <p class="iconfont icon-bofangsanjiaoxing" @click="startMusic" v-if="isStart"></p>
        <p class="iconfont icon-zanting" @click="stopMusic" v-else></p>
        <p class="iconfont icon-aixin" @click="this.$utils.getMore"></p>
      </div>
      <div class="pt-4 downMs">
        <p class="bg-info">下载歌曲</p>
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
  data() {
    return {
      musicUrl: "",
      isStart: true,
      songsInfo: {}
    };
  },
  props: ["id"],
  mounted() {
    this.getMusicinfo();
    this.getMusicUrl();
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
    async getMusicinfo() {
      const res = await this.$api.getSongDetail({ ids: this.id });
      if (res.code === 200) {
        this.songsInfo = {
          name: res.songs[0].name,
          picUrl: res.songs[0].al.picUrl,
          ar: res.songs[0].ar
        };
      }
    }
  },
  beforeDestroy() {
    localStorage.removeItem("songInfo");
  }
};
</script>
<style  scoped>
@import url("../assets/css/animate.min.css");
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
.play p {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  position: relative;
  margin: 0 20px;
}
.play p::before {
  position: absolute;
  font-size: 20px;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
}

.downMs p {
  display: block;
  height: 3rem;
  width: 18rem;
  line-height: 3rem;
  font-size: 18px;
  color: #fff;
  border-radius: 20px;
}
</style>

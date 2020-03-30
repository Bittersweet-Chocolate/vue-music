<!--  -->
<template>
  <div>
    <!-- 顶部盒子 -->
    <transition enter-active-class="animated fadeIn" appear>
      <div class="d-flex p-2 px-4 ai-center border-bottom">
        <div class="logo">
          <img src="../assets/img/logo.svg" alt class="h-100" />
        </div>
        <div class="flex-1 pl-2 top-text">更多QQ音乐排行榜</div>

        <a class="backRank text-grey" @click="$router.go(-1)">返回</a>
      </div>
    </transition>
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
        <a class="bg-info" @click="downMusic">下载歌曲</a>
      </div>
      <div>
        <audio :src="musicUrl" ref="audio"></audio>
      </div>
    </section>
  </div>
</template>

<script>
import { Lazyload, Indicator, Toast } from "mint-ui";
import Axios from "axios";
export default {
  data() {
    return {
      musicUrl: "",
      isStart: true,
      songsInfo: {},
      downLink:null
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
      this.musicUrl = res.data[0].url.replace('http://','https://');
    },

    // 控制播放
    startMusic() {
      const res = this.$refs.audio.error;
      if (res) {
        Toast({
          message: "歌曲,暂无资源",
          position: "center",
          duration: 2000
        });
        return;
      }
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
        this.downName = this.songsInfo.name + ".mp3";
      }
    },
    // 下载歌曲
    downMusic() {
      if(this.downLink){
        this.downLink.click()
        return
      }
      const res = this.$api.downMusic(this.musicUrl);
      res.then(val => {
        // 新建node节点存放当前 url
        let fileName = this.songsInfo.name;
        let blob = new Blob([val]);
        let fileUrl = window.URL.createObjectURL(blob);
        this.downLink = document.createElement("a");
        this.downLink .href = window.URL.createObjectURL(blob);
        this.downLink .download = fileName + ".mp3";
        this.downLink .click();
        console.log(this.downLink)
      });
    }
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

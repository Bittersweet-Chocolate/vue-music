<template>
  <div>
    <header class="top_wrap">
      <div class="top_wrap__bd"></div>
      <img class="top_wrap__bg" :src="playListInfo.coverImgUrl" />
    </header>
    <div class="opt_box">
      <div class="js_author author">
        <header class="js_open_profile js_tj author__hd" data-tj="profile">
          <img class="author__avatar" src="../assets/img/logo.svg" />
          <h6 class="author__name flex-1">音乐主题：{{playListInfo.tags}}</h6>

          <a class="fs-ssm" @click="goBlack()">更多主题</a>
        </header>
        <p class="author__desc">{{playListInfo.name}}</p>
      </div>
      <div class="play_bar_wrap">
        <div class="play_bar">
          <a class="js_play_all js_tj play_all" data-tj="play_all" href="javascript:;">
            <i class="play_all__icon">
              <div class="ico-div">
                <p
                  class="iconfont icon-bofangsanjiaoxing icon-s run-lf"
                  @click="startMusic"
                  v-if="isStart"
                ></p>
                <p class="iconfont icon-zanting icon-s" @click="stopMusic" v-else></p>
              </div>
            </i>
            <span class="play_all__text" v-if="isStart && musName.length===0">播放全部</span>
            <div v-else style="margin-left: 10px;">
              <span class="play_namae text-b">{{musName}}</span>
              <span
                class="fs-ssm text-grey"
                v-for="(data,index) in musAr"
                :key="index"
              >{{data.name |addLines(musAr)}}</span>
            </div>
          </a>
          <a class="js_collect js_tj collect" data-tj="collect" href="javascript:;">
            <p class="iconfont icon-aixin collect__icon" @click="this.$utils.getMore"></p>收藏歌单
          </a>
        </div>
      </div>
    </div>
    <ol>
      <li
        class="p-4 pb-2 pt-3"
        :style="musName===(data.name)?'color:#31c27c':null"
        v-for="(data,index) in tracks"
        :key="data.id"
        @click="chooseMusic(index,data.id)"
      >
        <div>
          <span class="text-ellipsis">{{data.name}}</span>
        </div>
        <div>
          <span
            class="text-grey pt-1 fs-sssm text-ellipsis"
            v-for="items in data.ar"
            :key="items.id"
          >{{items.name | addLines(data.ar)}}</span>
        </div>
      </li>
    </ol>
    <div>
      <audio :src="musicUrl" ref="audio" @ended="startNext"></audio>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 歌曲列表
      playListInfo: {},
      // 是否播放
      isStart: true,
      // 播放信息
      musName: "",
      musAr: [],
      musicUrl: "",
      // 记录当前播放位置
      idx: 0,
      tracks: [],
      // 改变播放歌曲颜色
      chgreen: ""
    };
  },
  props: ["infoId"],
  mounted() {
    this.getMusicListDetail();
  },
  methods: {
    // 获取歌单详情
    async getMusicListDetail() {
      const res = await this.$api.getMusicListDetail({ id: this.infoId });
      if (res.code === 200) {
        this.playListInfo = {
          name: res.playlist.name,
          coverImgUrl: res.playlist.coverImgUrl,
          tags: res.playlist.tags
        };
        this.tracks = res.playlist.tracks;
        this.playListInfo.tags = this.playListInfo.tags.join(" ");
        this.getMusicUrl();
      }
    },

    // 选择歌曲播放
    chooseMusic(idx, id) {
      if (!this.isStart && this.musName.length !== 0 && this.idx === idx) {
        this.stopMusic();
        return;
      }
      this.idx = idx;
      this.getMusicUrl();
      this.startMusic(0);
    },

    // 控制音乐
    startMusic(idx = 1) {
      if (idx === 0 || this.musName.length === 0) {
        this.changeName();
      }
      this.isStart = false;
      this.$refs.audio.play();
      this.$refs.audio.autoplay = true;
    },
    stopMusic() {
      this.isStart = true;
      this.$refs.audio.pause();
    },

    // 获取歌曲url
    async getMusicUrl() {
      const res = await this.$api.getSong({ id: this.tracks[this.idx].id });
      this.musicUrl = res.data[0].url;
    },

    // 修改播放名称显示
    changeName() {
      this.musName = this.tracks[this.idx].name;
      this.musAr = this.tracks[this.idx].ar;
    },

    //
    startNext() {
      this.idx++;
      if (this.idx >= this.tracks.length) {
        this.isStart = true;
        return;
      }
      this.changeName();
      this.getMusicUrl();
    },
    // 返回
    goBlack() {
      this.$router.push({ path: "/" });
    }
  },
  beforeDestroy() {
    this.$refs.audio.pause();
    this.$refs.audio.autoplay = false;
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/info.scss";
</style>
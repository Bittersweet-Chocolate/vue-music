<!--排行页面  -->
<template>
  <div class="p-3 mt-2">
    <div
      class="top d-flex bg-white mb-3"
      v-for="(item,index) in rankList"
      :key="index"
      @click="musicTop(index)"
    >
      <!-- 左边区域 -->
      <div class="top-left py-3 pl-3 flex-1">
        <h3 class="pb-2">{{item.name}}</h3>
        <ol>
          <li v-for="(item1,index1) in item.top3  " :key="index1">
            <p class="text-grey fs-ssm">
              <strong class="text-black">{{index1 + 1+'.'}}</strong>
              {{item1.name}}
            </p>
          </li>
        </ol>
      </div>
      <!-- 右边区域 -->
      <div class="top-right">
        <div class="top-content">
          <img v-lazy="item.coverImgUrl" alt class="h-100" />
          <!-- 播放量 -->
          <div class="song-list-info px-2">
            <i class="iconfont icon-bofangsanjiaoxing text-white fs-ssm"></i>
            <span class="fs-ssm text-white">{{item.playCount | toFixNumber(2)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Lazyload, Indicator } from "mint-ui";
export default {
  data() {
    return {
      rankList: [],
      r_idx: 0,
      r_len: 15
    };
  },
  mounted() {
    this.getRank();
  },
  methods: {
    // 获取排名信息
    getRank() {
      let result = localStorage.getItem("rankList");
      if (result) {
        const time = new Date().getTime();
        result = JSON.parse(result);
        if (time - result.time < 30 * 60 * 1000) {
          this.rankList = result.data;
          return;
        }
        localStorage.removeItem("rankList");
      }
      this.getRankList();
    },
    async getRankList() {
      Indicator.open("加载中...");
      let idx = this.r_idx;
      let len = this.r_len;
      try {
        for (; idx < len; idx++) {
          const result = await this.$api.getRankList({
            idx: idx
          });
          if (result.code === 200)
            this.rankList.push({
              coverImgUrl: result.playlist.coverImgUrl,
              name: result.playlist.name,
              top3: result.playlist.tracks.splice(0, 3),
              playCount: result.playlist.playCount
            });
        }
        Indicator.close();
      } catch (e) {
        console.log(e);
      }
    },
    // 路由跳转top详情
    musicTop(id) {
      this.$router.push({ name: "musicTop", params: { topId: id } });
    },
    // 添加排名的local
    setLocalRank() {
      if (!localStorage.getItem("rankList")) {
        localStorage.setItem(
          "rankList",
          JSON.stringify({
            time: new Date().getTime(),
            data: this.rankList
          })
        );
      }
    }
  },
  computed: {},
  beforeDestroy() {
    this.setLocalRank();
  }
};
</script>
<style lang="scss">
@import url(../assets/css/rank.scss);
</style>

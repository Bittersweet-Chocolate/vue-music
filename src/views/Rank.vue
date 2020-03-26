<!--排行页面  -->
<template>
  <div class="p-3 mt-2">
    <div
      class="top d-flex bg-white mb-3"
      v-for="(item,index) in rankList"
      :key="index"
      @click="musicIn(index)"
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
import { Lazyload } from "mint-ui";
export default {
  data() {
    return {
      rankList: []
    };
  },
  mounted() {
    this.getRank(10);
    // if (this.rankList.length === 0) this.getRankListAction(3);
  },
  methods: {
    // ...mapActions(["getRankListAction"]),
    // 获取排名信息
    getRank(idx) {
      let result = localStorage.getItem("rankList");
      if (result) {
        const time = new Date().getTime();
        result = JSON.parse(result);
        if (time - result.time < 30 * 60 * 1000) {
          this.rankList = result.data;
          return;
        }
      }
      this.getRankList(idx);
    },
    async getRankList(idx = 10) {
      try {
        for (let i = 0; i < idx; i++) {
          const result = await this.$api.getRankList({
            idx: i
          });
          if (result.code === 200)
            this.rankList.push({
              playlist: result.playlist.tracks,
              description: result.playlist.description,
              coverImgUrl: result.playlist.coverImgUrl,
              name: result.playlist.name,
              top3: result.playlist.tracks.splice(0, 3),
              playCount: result.playlist.playCount
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 路由跳转详情
    musicIn(id) {
      this.$router.push("/info/" + id);
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
/* @import url(); 引入css类 */
ol li {
  list-style: none;
}
.song-list-info {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.4);
}
.top-content {
  height: 7.6923rem;
  position: relative;
}
.top {
  border-radius: 10px;
  overflow: hidden;
}
</style>

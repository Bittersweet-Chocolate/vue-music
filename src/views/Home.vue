<template>
  <div class="home px-3">
    <section class="pt-3 sea pb-1">
      <i class="iconfont icon-sousuo pos"></i>
      <input
        ref="searchRef"
        type="text"
        placeholder="搜索"
        class="py-2 search text-center text-grey"
        :class="searchWidth"
        @focus="isSearch=true;searchWidth='w-80'"
      />
      <a href="#" class="ml-4" @click="isSearch=false;searchWidth='w-100'" v-show="isSearch">取消</a>
      <div class="searchBox" v-show="isSearch">
        <h4 class="mx-3 py-3">热门搜索</h4>
        <div class="hot d-flex flex-wrap">
          <a
            href="#"
            class="bg-white px-2 mr-2 py-1 mb-3 fs-sm text-grey"
            v-for="(item,index) in hotList"
            :key="index"
          >{{item.album.name}}</a>
        </div>
      </div>
    </section>
    <m-card
      v-show="!isSearch"
      v-for="data in homeList"
      :key="data.id"
      :title="data.title_template"
      href="#"
    >
      <div class="removeScroll">
        <div class="song-list d-flex">
          <div
            v-for="(item, index) in data.v_niche[0].v_card"
            @click="musicPlay(item.id)"
            :key="index"
            class="song-list-item mr-2 pb-4"
          >
            <div class="song-list-box">
              <img :src="item.cover" alt />
              <div class="song-list-info px-2">
                <i class="iconfont icon-bofangsanjiaoxing text-white fs-ssm"></i>
                <span class="fs-ssm text-white">{{item.cnt | localWan}}</span>
              </div>
            </div>
            <div class="text-grey text-center mt-2">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSearch: false,
      searchWidth: "w-100"
    };
  },
  methods: {
    search(){

    },
    musicPlay() {}
  },
  created() {
    // 请求歌单
    this.$store.dispatch("getHomeListAction");
  },
  computed: {
    // 添加 歌单列表，歌曲列表，热门搜索
    ...mapState(["musicList", "hotList", "homeList"])
  },
  filters: {
    localWan(val) {
      if (10000 < val < 1000000) return Math.round(val / 10000) + "万";
    }
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/home.scss";
</style>

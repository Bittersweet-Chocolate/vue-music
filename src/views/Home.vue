<template>
  <div class="home px-3">
    <section class="pt-3 sea pb-1">
      <i class="iconfont icon-sousuo pos"></i>
      <input
        ref="searchRef"
        type="text"
        placeholder="搜索"
        class="w-100 py-2 search text-center text-grey"
        @focus="searchMS"
      />
      <a href="#" class="ml-4" @click="searchBL" v-show="isSearch">取消</a>
      <div class="searchBox" v-show="isSearch">
        <h4 class="mx-3 py-3">热门搜索</h4>
        <div class="hot d-flex flex-wrap">
          <a
            href="#"
            class="bg-white px-2 mr-2 py-1 mb-3 fs-sm text-grey"
            v-for="(item,index) in hotList"
            :key="index"
          >{{item.first}}</a>
        </div>
      </div>
    </section>
    <m-card v-for="data in homeList" :key="data.id" :title="data.title_template" href="#">
      <div class="removeScroll">
        <div class="song-list d-flex">
          <div
            v-for="(item, index) in musicList"
            @click="musicPlay(item.id)"
            :key="index"
            class="song-list-item mr-2 pb-4"
          >
            <div class="song-list-box">
              <img :src="item.imgUrl" alt />
              <div class="song-list-info px-2">
                <i class="iconfont icon-bofangsanjiaoxing text-white fs-ssm"></i>
                <span class="fs-ssm text-white">{{item.count | localWan}}</span>
              </div>
            </div>
            <div class="text-grey mt-2">{{ item.name }}</div>
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
      isSearch: false
    };
  },
  methods: {
    searchBL() {},
    searchMS() {},
    musicPlay() {}
  },
  created() {
    // 请求歌单
    this.$store.dispatch("getHomeListAction");
  },
  computed: {
    ...mapState(["musicList", "hotList", "homeList"])
  },
  filters: {
    localWan() {
      return "11";
    }
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/home.scss";
</style>

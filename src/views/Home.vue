<template>
  <div class="home px-3">
    <section class="pt-3 sea pb-1">
      <div>
        <i class="iconfont icon-sousuo" :class="{'pos-center':left_center,'pos-left':!left_center}"></i>
        <input
          ref="searchRef"
          type="text"
          placeholder="搜索"
          class="py-2 search text-grey w-100"
          :style="searchText"
          @click="handleSearch(1)"
          v-model="searchName"
        />
      </div>
      <span class="ml-3" @click="handleSearch(0)" v-show="isSearch">取消</span>
    </section>
    <s-card-list v-show="!searchs">
      <template>
        <router-link v-for="data in searchList" :key="data.id" tag="a" to="/rank">
          <div>
            {{data.name}}
            <div>{{data.artists[0].name}}--{{data.album.name}}</div>
          </div>
          <div></div>
        </router-link>
      </template>
    </s-card-list>

    <section v-show="isSearch && searchs">
      <div class="searchBox">
        <h4 class="mx-3 py-3">热门搜索</h4>
        <div class="hot d-flex flex-wrap">
          <a
            href="#"
            class="bg-white px-2 mr-2 py-1 mb-3 fs-sm text-grey"
            v-for="(item,index) in hotList"
            @click="handelSeachList(item.first)"
            :key="index"
          >{{item.first}}</a>
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
import { HOT, SEARCHL } from "@/api/index";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      isSearch: false,
      searchs: true,
      searchText: "text-align:center",
      left_center: true,
      hotList: [],
      homeList: [],
      searchList: [],
      searchName: ""
    };
  },
  methods: {
    // 获取热搜信息
    async searchHot() {
      try {
        const { result } = await this.$axios({
          methods: HOT.type,
          url: HOT.url
        });
        this.hotList = result.hots;
      } catch (e) {
        console.log(e);
      }
    },
    // 搜索事件
    handleSearch(idx) {
      if (idx === 1 && this.isSearch) return;
      if (idx === 0) {
        this.searchName = "";
        this.searchList = [];
      }
      this.isSearch = !this.isSearch;
      this.searchText === "text-align:center"
        ? (this.searchText = "text-indent:35px")
        : (this.searchText = "text-align:center");
      this.left_center = !this.left_center;
    },
    // 搜索详情
    async handelSeachList(name) {
      Indicator.open('查询中...');
      this.searchName = name;
      try {
        const { result } = await this.$axios({
          methods: SEARCHL.type,
          url: SEARCHL.url + this.searchName
        });
        this.searchList = result.songs;
        Indicator.close();
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.searchHot();
  },
  computed: {
    getSeachlist() {
      console.log(1);
      debounce(this.handelSeachList, 1500);
      return searchList;
    }
  },
  watch: {
    searchName(val) {
      val.length !== 0 ? (this.searchs = false) : (this.searchs = true);
    }
  },
  filters: {
    localWan(val) {
      if (10000 < val < 1000000) return (val / 10000).toFixed(2) + "万";
    }
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/home.scss";
</style>

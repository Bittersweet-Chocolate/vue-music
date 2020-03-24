<template>
  <div class="home px-3" >
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

    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <m-card
        v-show="!isSearch"
        v-for="data in musicList"
        :key="data.tagId"
        :title="data.tag"
        href="#"
      >
        <div class="removeScroll">
          <div class="song-list d-flex" v-if="data.music.length!==0">
            <div
              v-for="(item, index) in data.music"
              @click="musicPlay(item.id)"
              :key="index"
              class="song-list-item mr-2 pb-4"
            >
              <div class="song-list-box">
                <img v-lazy="item.coverImgUrl" alt />
                <div class="song-list-info px-2">
                  <i class="iconfont icon-bofangsanjiaoxing text-white fs-ssm"></i>
                  <span class="fs-ssm text-white">{{item.playCount | toFix(2)}}</span>
                </div>
              </div>
              <div  class="text-grey mt-2">{{ item.name | subName(12) }}</div>
            </div>
          </div>
          <div v-else style="height:100%;width:100%">
            <span style="text-align:center;display:block;height:100%;line-height: 10;">该类型暂无数据</span>
          </div>
        </div>
      </m-card>
    </mt-loadmore>
  </div>
</template>
<script>
import { HOT, SEARCHL } from "@/api/index";
import { Indicator, Loadmore, Lazyload } from "mint-ui";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 搜索框状态
      isSearch: false,
      searchs: true,
      searchText: "text-align:center",
      left_center: true,
      // 最热搜索
      hotList: [],
      searchList: [],
      searchName: ""
    };
  },
  methods: {
    // 获取热搜信息
    async getSearchHot() {
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
      Indicator.open("查询中...");
      this.searchName = name;
      try {
        const { result } = await this.$axios({
          methods: SEARCHL.type,
          url: SEARCHL.url,
          params: {
            keywords: this.searchName
          }
        });
        this.searchList = result.songs;
        Indicator.close();
      } catch (e) {
        console.log(e);
      }
    },
    loadTop() {
      this.refresh();
      this.$refs.loadmore.onTopLoaded();
    },
    // 刷新组件
    refresh() {
      var arr = this.$utils.getRandom(0, 10, 3);
      for (let i = 0; i < arr.length; i++) {
        this.getMusicListAction({
          limit: 6,
          tag: this.tagList[arr[i]].name,
          tagId: this.tagList[arr[i]].id
        });
      }
    },

    ...mapActions(["getMusicListAction"])
  },
  mounted() {
    // 获取最热
    this.getSearchHot();
  },
  computed: {
    // 获取查询列表
    getSeachlist() {
      debounce(this.handelSeachList, 1500);
      return searchList;
    },
    ...mapState({
      musicList: function(state) {
        return state.musicList;
      },
      tagList: function(state) {
        return state.tagList;
      }
    })
  },
  watch: {
    searchName(val) {
      val.length !== 0 ? (this.searchs = false) : (this.searchs = true);
    }
  },
  filters: {
    // 点播数过滤
    toFix(target, idx) {
      if (10000 < target < 1000000) return (target / 10000).toFixed(idx) + "万";
      return target;
    },
    // 名称过滤
    subName(target, idx) {
      if (target.length > idx) return target.substr(0, idx) + "...";
      return target;
    }
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/home.scss";
</style>

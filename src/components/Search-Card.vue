<template>
  <search-list v-if="searching" :searchList="getNameList"></search-list>
  <section v-else>
    <div class="searchHis" v-if="searchHis.length!==0">
      <div style="position: absolute;right: 0.4rem;padding-top:0.4rem">
        <img src="../assets/img/bin.svg" width="80%" @click="deleteSearchHis()" />
      </div>
      <h4 class="mx-3 py-3">搜索历史</h4>
      <div class="hot d-flex flex-wrap">
        <a
          href="#"
          class="bg-white px-2 mr-2 py-1 mb-3 fs-sm text-grey"
          v-for="(item,index) in searchHis"
          @click="handelSeachList(item)"
          :key="index"
        >{{item}}</a>
      </div>
    </div>
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
</template>
<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      hotList: [],
      searchHis: [],
      getNameList: [],
      nothing: ""
    };
  },
  props: ["getName", "searching"],
  mounted() {
    // 获取最热
    this.getSearchHot();
    this.getSearchHis();
  },
  methods: {
    // 获取热搜信息
    async getSearchHot() {
      let hotData = localStorage.getItem("hotData");
      if (hotData) {
        hotData = JSON.parse(hotData);
        if (new Date().getTime() - hotData.time < 30 * 60 * 1000) {
          this.hotList = hotData.data;
          return;
        }
      }
      try {
        const result = await this.$api.getHotList();
        if (result.code !== 200) return;
        this.hotList = result.result.hots;
        localStorage.setItem(
          "hotData",
          JSON.stringify({
            time: new Date().getTime(),
            data: result.result.hots
          })
        );
      } catch (e) {
        console.log(e);
      }
    },

    // 获取搜索
    handelSeachList(name) {
      if (name.replace(/\s+/g, "").length === 0) return;
      Indicator.open("查询中...");
      this.$utils._throttle(this.getSearchList(name), 1500);
    },
    // 搜索详情
    async getSearchList(name) {
      try {
        const { result } = await this.$api.getSearchList({
          keywords: name,
          type: 1
        });
        if (this.getName.length === 0) this.$emit("chooseSeach", name);
        this.getNameList = result.songs;
        if (this.searchHis.length > 5) this.searchHis.pop();
        if (this.searchHis.indexOf(name) === -1) this.searchHis.push(name);
        Indicator.close();
      } catch (e) {
        Indicator.close();
        Toast({
          message: "未知错误",
          position: "middle",
          duration: 2000
        });
        console.log(e);
      }
    },

    // 清除搜索历史
    clearSeacherList() {
      this.getNameList = [];
    },
    
    // 获取历史信息
    getSearchHis() {
      let searchHis = localStorage.getItem("searchHis");
      if (searchHis) {
        searchHis = JSON.parse(searchHis);
        this.searchHis = searchHis.data;
      }
    },

    // 手动清除历史
    deleteSearchHis() {
      this.searchHis = [];
      localStorage.removeItem("hotData");
    },

    // 销毁之前添加历史
    addSearchHis() {
      localStorage.setItem(
        "searchHis",
        JSON.stringify({
          data: this.searchHis
        })
      );
    }
  },
  computed: {},
  beforeDestroy() {
    this.addSearchHis();
  }
};
</script>
<style lang="scss">
</style>
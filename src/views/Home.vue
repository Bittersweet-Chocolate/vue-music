<template>
  <div class="home px-3">
    <section class="pt-3 sea pb-1">
      <div>
        <i class="iconfont icon-sousuo" :class="{'pos-center':left_center,'pos-left':!left_center}"></i>
        <input
          type="search"
          placeholder="搜索"
          class="py-2 search text-grey w-100"
          :style="searchText"
          @focus="handleInput(1)"
          @keyup.13="handleSearch()"
          v-model="searchName"
        />
      </div>
      <span class="ml-3" @click="handleInput(0)" v-show="isSearch">取消</span>
    </section>

    <search-card
      v-if="isSearch"
      :searching="searching"
      @chooseSeach="chooseSeach($event)"
      ref="sch"
    ></search-card>

    <!-- 显示 -->

    <mt-loadmore :top-method="loadTop" ref="loadmore" v-else>
      <div class="s-card">
        <transition-group enter-active-class="animated bounceInDown" @before-enter="beforeEnter">
          <tag-card
            v-for="(data,index) in musicList"
            :key="data.tagId"
            :title="data.tag"
            :data-index="index"
          >
            <div class="removeScroll">
              <div class="song-list d-flex" v-if="data.music.length!==0">
                <div
                  v-for="(item, index) in data.music"
                  @click="musicInfo(item.id)"
                  :key="index"
                  class="song-list-item mr-2 pb-4"
                >
                  <div class="song-list-box">
                    <img v-lazy="item.coverImgUrl" alt />
                    <div class="song-list-info px-2">
                      <i class="iconfont icon-bofangsanjiaoxing text-white fs-ssm"></i>
                      <span class="fs-ssm text-white">{{item.playCount | toFixNumber(2)}}</span>
                    </div>
                  </div>
                  <div class="text-grey mt-2" style="width:7.62rem">{{ item.name | subName(12) }}</div>
                </div>
              </div>
              <div v-else style="height:100%;width:100%">
                <span style="text-align:center;display:block;height:100%;line-height: 10;">该类型暂无数据</span>
              </div>
            </div>
          </tag-card>
        </transition-group>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { _throttle } from "@/utils/common";
import { Lazyload } from "mint-ui";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // 搜索框状态
      isSearch: false,
      searching: false,
      searchText: "text-align:center",
      left_center: true,
      // 搜索名称
      searchName: ""
    };
  },
  created() {
    // 获取歌曲和歌单名
    if (this.tagList.length === 0) this.getTagListAction();
  },
  methods: {
    // 搜索操作
    handleInput(idx) {
      if (idx === 1 && this.isSearch) return;
      if (idx === 0) {
        this.searchName = "";
        this.searchList = [];
        this.searchText = "text-align:center";
      }
      if (idx === 1) {
        this.searchText = "text-indent:35px";
      }
      this.isSearch = !this.isSearch;
      this.left_center = !this.left_center;
    },
    // 下拉事件
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
    // search组件向父组件传值
    chooseSeach(name = "") {
      this.searchName = name;
      this.searching = true;
    },
    // 调用子组件方法
    handleSearch() {
      this.$refs.sch.handelSeachList(this.searchName);
    },
    // 动画绑定延时 0.1
    beforeEnter(el) {
      let delayNum = "." + el.dataset.index * 500 + "s";
      el.style.animationDelay = delayNum;
    },
    // 详情页跳转
    musicInfo(id) {
      this.$router.push({ name: "info", params: { infoId: id } });
    },
    ...mapActions(["getMusicListAction", "getTagListAction"]),
    ...mapMutations(["setSearchHisMutaion"])
  },
  computed: {
    // 获取vuex中state
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
    // 监测搜索字
    searchName(val) {
      val.length !== 0
        ? (this.searching = true)
        : ((this.searching = false), this.$refs.sch.clearSeacherList());
    }
  },
  filters: {
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

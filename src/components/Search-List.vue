<template>
  <section>
    <ul>
      <li class="mx-3 s-list" v-for="data in searchList" :key="data.id">
        <h3 class="overText">{{data.name}}</h3>
        <div class="overText">
          <span class="text-grey" v-for="(item,index) in data.artists" :key="index">{{item.name}} /</span>
          <span class="text-grey">- {{data.album.name}}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["searchList"],
  computed: {
    // searchList() {
    //   if (this.searchList.length === 0) {
    //   }
    // }
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/search.scss";
</style>

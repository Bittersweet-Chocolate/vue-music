<template>
  <section>
    <ul>
      <li class="mx-3 s-list" v-for="data in searchList" :key="data.id" @click="musicPlay(data.id)">
        <h3 class="overText">{{data.name}}</h3>
        <div class="overText">
          <span
            class="text-grey"
            v-for="(item,index) in data.artists"
            :key="index"
          >{{item.name | addLines(data.artists)}}</span>
          <span class="text-grey"> - {{data.album.name}}</span>
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
  methods:{
    musicPlay(id){
      this.$router.push({ name: "musicPlay", params: { id: id } });
    }
  }
};
</script>
<style lang="scss" scope>
@import "../assets/css/search.scss";
</style>

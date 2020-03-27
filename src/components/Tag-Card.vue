<!-- 卡片组件 -->
<template>
  <div class="card py-2 mt-2">
    <div class="card-header d-flex ai-center pb-3">
      <h3 class="fs-lg flex-1">{{ title }}</h3>
      <p  class="text-grey fs-sm" @click="this.$utils.getMore">更多</p>
      <i class="iconfont icon-right text-grey fs-ssm"></i>
    </div>
    <div class="card-body pt-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 接收父组件传递过来的值 一般形式是props:[title,icon]
    title: { type: String, required: true }, // 这里规定传递过来的类型必须为字符串,是必传字段
  },
  methods: {

  }
};
</script>
<style lang="scss">
/* @import url() 引入css类 */
</style>

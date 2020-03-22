<template>
  <div>
    <section>
      <slot></slot>
      <p class="u-scroll">全部加载完</p>
    </section>
  </div>
</template>
<style lang="scss">
.u-sroll{
    line-height: 30px;
    color: #888;
    font-size: 14px;
    text-align: center;
}
</style>
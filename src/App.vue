<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import 'swiper/css/swiper.min.css'
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss">
// 子路由过滤动效
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: 0.2s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.2s;
}
</style>

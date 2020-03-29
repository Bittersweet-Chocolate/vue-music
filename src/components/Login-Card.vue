<template>
  <div class="login-card">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style  scoped>
.login-card {
  background: #fff;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
}
</style>
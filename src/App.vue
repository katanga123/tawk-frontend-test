<template>
  <div class="tawk">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss" scoped>
@import "scss/main.scss";
</style>
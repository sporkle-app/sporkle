<template>
  <RouterLink
    v-text="'&#x2715;'"
    class="close-view"
    :to="{ name: 'home' }"
  />
</template>

<script>
export default {
  name: 'CloseView'
};
</script>

<style scoped>
.close-view {
  position: absolute;
  top: calc(var(--timeline-height) + 5px);
  right: 23px;
  font-size: 27px;
  text-decoration: none;
}
</style>

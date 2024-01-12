<template>
  <RouterLink
    class="close-view"
    :to="{ name: 'home' }"
  >
    <VIcon
      name="ri-close-line"
      scale="2"
    />
  </RouterLink>
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

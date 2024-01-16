<template>
  <RouterLink
    class="close-view"
    :to="{ name: 'home' }"
  >
    <BaseIcon
      name="RiCloseLine"
      scale="2"
    />
  </RouterLink>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'CloseView',
  components: {
    BaseIcon
  }
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

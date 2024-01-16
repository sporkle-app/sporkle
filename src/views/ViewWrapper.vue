<template>
  <div class="view-wrapper">
    <CloseView />
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
import CloseView from '@/components/CloseView.vue';

export default {
  name: 'ViewWrapper',
  components: {
    CloseView
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.view-wrapper {
  height: calc(100vh - var(--timeline-height));
  padding: 20px;
  overflow: auto;
}
</style>

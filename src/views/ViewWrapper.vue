<template>
  <div class="view-wrapper">
    <CloseView v-if="reposList.length" />
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { reposStore } from '@/stores/repos.js';

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
  },
  computed: {
    ...mapState(reposStore, [
      'reposList'
    ])
  }
};
</script>

<style scoped>
.view-wrapper {
  container-type: inline-size;
  height: calc(100vh - var(--timeline-height));
  padding: 20px;
  overflow: auto;
}
</style>

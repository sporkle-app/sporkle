<template>
  <div class="view-wrapper">
    <CloseView v-if="showX" />
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { reposStore } from '@/stores/repos.js';

import CloseView from '@/components/CloseView.vue';

const fs = window.require('fs');

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
    showX: function () {
      return (
        this.reposList.length &&
        this.currentRepo &&
        fs.existsSync(this.currentRepo)
      );
    },
    ...mapState(reposStore, [
      'currentRepo',
      'reposList'
    ])
  }
};
</script>

<style scoped>
.view-wrapper {
  container-type: inline-size;
  height: calc(100vh - var(--top-panel-height));
  padding: 20px;
  overflow: auto;
}
</style>

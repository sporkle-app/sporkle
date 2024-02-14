<template>
  <ViewWrapper :title="'Cannot locate ' + repoName">
    <div>
    </div>
  </ViewWrapper>
</template>

<script>
import { mapState } from 'pinia';

import ViewWrapper from '@/views/ViewWrapper.vue';

import { reposStore } from '@/stores/repos.js';

export default {
  name: 'MissingRepo',
  components: {
    ViewWrapper
  },
  computed: {
    repoName: function () {
      if (this.currentRepo) {
        const path = window.require('path');
        return path.basename(this.currentRepo);
      }
      return 'repository';
    },
    ...mapState(reposStore, [
      'currentRepo'
    ])
  }
};
</script>

<style scoped>
</style>

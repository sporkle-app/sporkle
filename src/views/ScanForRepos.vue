<template>
  <ViewWrapper title="Scan for repos" />
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { reposStore } from '@/stores/repos.js';

import ViewWrapper from '@/views/ViewWrapper.vue';

export default {
  name: 'ScanForRepos',
  components: {
    ViewWrapper
  },
  methods: {
    ...mapActions(reposStore, [
    ])
  },
  computed: {
    ...mapState(reposStore, [
    ])
  }
};
</script>

<style scoped>
</style>

<template>
  <div class="repos-list">
    <div
      v-for="(repo, repoIndex) in reposList"
      :key="'repo' + repoIndex"
    >
      <RepoListItem :repo="repo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { sidebarStore } from '@/stores/sidebar.js';

import RepoListItem from '@/components/sidebar/RepoListItem.vue';

export default {
  name: 'ReposList',
  components: {
    RepoListItem
  },
  computed: {
    ...mapState(sidebarStore, [
      'reposList'
    ])
  }
};
</script>

<template>
  <div class="repos-list">
    <RepoListItem
      v-for="(repo, repoIndex) in filteredReposList"
      :repo="repo"
      :key="'repo' + repoIndex"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { reposStore } from '@/stores/repos.js';

import RepoListItem from '@/components/sidebar/RepoListItem.vue';

export default {
  name: 'ReposList',
  components: {
    RepoListItem
  },
  computed: {
    ...mapState(reposStore, [
      'filteredReposList'
    ])
  }
};
</script>

<style>
.repos-list {
  height: 100%;
  overflow: auto;
}
</style>

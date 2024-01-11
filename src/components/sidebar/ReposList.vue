<template>
  <div class="repos-list">
    <div
      v-for="(repo, repoIndex) in filteredReposList"
      :key="'repo' + repoIndex"
    >
      <RepoListItem :repo="repo" />
    </div>
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
  padding: 10px;
  overflow: auto;
}
</style>

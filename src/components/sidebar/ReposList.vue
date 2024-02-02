<template>
  <div class="repos-list">
    <RepoListItem
      v-for="(repo, repoIndex) in filteredReposList"
      :repo="repo"
      :key="'repo' + (repo.filePath || repoIndex)"
    />
    <div
      v-if="!reposList.length && $route.name !== 'scanForRepos'"
      class="empty-state"
    >
      <RouterLink :to="{ name: 'scanForRepos' }">
        Click to add repositories
      </RouterLink>
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
      'filteredReposList',
      'reposList'
    ])
  }
};
</script>

<style>
.repos-list {
  height: 100%;
  overflow: auto;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

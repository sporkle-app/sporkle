<template>
  <div class="repos-list">
    <TransitionGroup name="list">
      <div
        v-for="(repo, repoIndex) in filteredReposList"
        class="accordion-container"
        :key="'repo' + (repo.filePath || repoIndex)"
      >
        <div class="accordion-inner">
          <RepoListItem :repo="repo" />
        </div>
      </div>
    </TransitionGroup>
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
.accordion-container {
  display: grid;
  grid-template-rows: 1fr;
}
.accordion-inner {
  grid-row: 1 / span 2;
  overflow: hidden;
}

.list-enter-active,
.list-leave-active {
  grid-template-rows: 1fr;
  transition: 1200ms ease all;
}

.list-enter-from,
.list-leave-to {
  grid-template-rows: 0fr;
}
</style>

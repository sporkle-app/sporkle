<template>
  <div class="repos-list">
    <div
      v-for="(repo, repoIndex) in localReposList"
      :key="'repo' + repoIndex"
    >
      <repo-list-item :repo="repo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import cloneDeep from 'lodash.clonedeep';

import repoListItem from '@/components/sidebar/RepoListItem.vue';

export default {
  name: 'ReposList',
  components: {
    'repo-list-item': repoListItem
  },
  data: function () {
    return {
      localReposList: []
    };
  },
  methods: {
    setLocalReposList: function () {
      this.localReposList = cloneDeep(this.reposList);
    }
  },
  computed: {
    ...mapState('reposList', [
      'reposList'
    ])
  },
  watch: {
    reposList: function () {
      this.setLocalReposList();
    }
  },
  created: function () {
    this.setLocalReposList();
  }
};
</script>

<template>
  <ViewWrapper title="Clone down a repository">
    <label for="repo-url-input">
      <strong>
        Enter url:
      </strong>
    </label>
    <div class="repo-url-select">
      <input v-model="url" class="repo-url-input" placeholder="Enter url" />
      <button @click="clone">Clone</button>
    </div>
    <ReposFolderPicker label="Enter location:" />
  </ViewWrapper>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { gitCloneStore } from '@/stores/gitClone.js';
import { reposStore } from '@/stores/repos.js';

import ReposFolderPicker from '@/components/appsettings/ReposFolderPicker.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';

export default {
  name: 'CloneRepo',
  components: {
    ViewWrapper,
    ReposFolderPicker
  },
  data: function () {
    return {
      url: ''
    };
  },
  methods: {
    clone: async function () {
      if (!this.url) {
        return;
      }

      if (!this.reposFolder) {
        return;
      }

      const repoName = this.url.split('/').pop().replace('.git', '');
      const repoPath = this.reposFolder + '/' + repoName;
      await this.cloneRepo(this.url, repoPath);
    },
    ...mapActions(gitCloneStore, ['cloneRepo'])
  },
  computed: {
    ...mapState(reposStore, ['reposFolder'])
  }
};
</script>
<style scoped>
.repo-url-select {
  display: flex;
  padding-bottom: 20px;
}

.repo-url-input {
  flex: 1;
}
</style>
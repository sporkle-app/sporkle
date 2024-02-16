<template>
  <ViewWrapper title="Clone down a repository">
    <label for="repo-url-input">
      <strong>
        Enter url:
      </strong>
    </label>
    <div class="repo-url-select">
      <input
        v-model="url"
        id="repo-url-input"
        class="repo-url-input"
        placeholder="Enter url"
      />
      <button :disabled="invalidUrl" @click="clone">Clone</button>
    </div>
    <p v-if="invalidUrl">
      <strong><em>
        That repo already exists.
      </em></strong>
    </p>
    <div class="folder-picker">
      <ReposFolderPicker />
    </div>
  </ViewWrapper>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
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

      const repoPath = this.reposFolder + '/' + this.repoName;

      try {
        await this.cloneRepo(this.url, repoPath);
        this.addRepoToList(repoPath);
        this.url = '';
        this.$router.push({ name: 'commits' });
      } catch (error) {
        this.addErrorAlert('Error cloning repository.', error);
      }
    },
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(reposStore, [
      'addRepoToList'
    ]),
    ...mapActions(gitCloneStore, [
      'cloneRepo'
    ])
  },
  computed: {
    invalidUrl: function () {
      for (let i = 0; i < this.reposList.length; i++) {
        if (this.reposList[i].title === this.repoName) {
          console.log(this.reposList[i].title, this.repoName);
          return true;
        }
      }
      return false;
    },
    repoName: function () {
      return this.url.split('/').pop().replace('.git', '');
    },
    ...mapState(reposStore, [
      'reposFolder',
      'reposList'
    ])
  }
};
</script>
<style scoped>
.folder-picker {
  padding-top: 30px;
}
.repo-url-select {
  display: flex;
}
.repo-url-input {
  flex: 1;
}
</style>

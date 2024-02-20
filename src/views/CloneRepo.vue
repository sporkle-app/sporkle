<template>
  <ViewWrapper title="Clone down a repository">
    <label for="repo-url-input">
      <strong>
        Paste HTTPS or SSH URL to clone here:
      </strong>
    </label>
    <div class="repo-url-select">
      <input
        v-model="url"
        id="repo-url-input"
        class="repo-url-input"
        placeholder="https://github.com/username/repository.git"
      />
      <button
        :disabled="repoAlreadyExists || repoIsInSidebarAlready"
        @click="clone"
      >Clone</button>
    </div>
    <p v-if="repoAlreadyExists || repoIsInSidebarAlready">
      <strong><em>
        That repo already exists.
      </em></strong>
    </p>
    <p v-if="url && (!startsWithGitOrHttps || !endsWithGit)">
      <strong><em>
        Repository cloning URLs generally:
        <ul>
          <li v-if="!startsWithGitOrHttps">
            begin with <code>git@</code> or <code>https://</code>
          </li>
          <li v-if="!endsWithGit">
            end with <code>.git</code>
          </li>
        </ul>
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

const fs = window.require('fs');
const path = window.require('path');

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

      try {
        await this.cloneRepo(this.url, this.repoPath);
        this.addRepoToList(this.repoPath);
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
    startsWithGitOrHttps: function () {
      return this.url.startsWith('git@') || this.url.startsWith('https://');
    },
    endsWithGit: function () {
      return this.url.endsWith('.git');
    },
    repoAlreadyExists: function () {
      if (this.repoPath) {
        return fs.existsSync(this.repoPath);
      }
      return false;
    },
    repoIsInSidebarAlready: function () {
      return this.sortedRepoPaths.includes(this.repoPath);
    },
    repoName: function () {
      if (this.url) {
        return path.parse(this.url).name;
      }
      return '';
    },
    repoPath: function () {
      if (this.reposFolder && this.repoName) {
        return path.join(this.reposFolder, this.repoName);
      }
      return '';
    },
    ...mapState(reposStore, [
      'reposFolder',
      'sortedRepoPaths'
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

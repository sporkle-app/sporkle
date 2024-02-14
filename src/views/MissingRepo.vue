<template>
  <ViewWrapper :title="'Cannot locate ' + repoName">
    <div>
      <p>The following directory does not seem to exist:</p>
      <strong><em>{{ currentRepo }}</em></strong>

      <div class="actions-container">
        <button @click="replaceRepo">
          <BaseIcon name="ri-folder-open-fill" />
          Locate
        </button>
        <button @click="remove">
          <BaseIcon name="ri-error-warning-line" />
          Remove from {{ APP_NAME }}
        </button>
        <button @click="$router.push({ name: 'cloneRepo' })">
          <BaseIcon name="ri-file-copy-fill" />
          Clone again
        </button>
      </div>
    </div>
  </ViewWrapper>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';
import { reposStore } from '@/stores/repos.js';

import { APP_NAME } from '@/helpers/constants.js';
import helpers from '@/helpers/index.js';

import BaseIcon from '@/components/BaseIcon.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';

const fs = window.require('fs');

export default {
  name: 'MissingRepo',
  components: {
    BaseIcon,
    ViewWrapper
  },
  constants: {
    APP_NAME
  },
  methods: {
    navigateIfNotMissing: function () {
      if (fs.existsSync(this.currentRepo)) {
        this.$router.push({ name: 'commits' });
      }
    },
    replaceRepo: async function () {
      const repoPath = await helpers.openFileExplorerToSelectRepo(this.reposFolder);
      if (repoPath) {
        await this.removeRepoFromListAndSave(this.currentRepo);
        await this.addRepoToListAndSave(repoPath);
        await this.$router.push({ name: 'commits' });
      }
    },
    remove: async function () {
      await helpers.removeRepoFromApp(
        this.removeRepoFromListAndSave,
        this.currentRepo,
        this.sortedRepoPaths,
        this.$router
      );
    },
    ...mapActions(andSaveStore, [
      'addRepoToListAndSave',
      'removeRepoFromListAndSave'
    ])
  },
  computed: {
    repoName: function () {
      if (this.currentRepo) {
        const path = window.require('path');
        return path.basename(this.currentRepo);
      }
      return 'repository';
    },
    ...mapState(reposStore, [
      'currentRepo',
      'reposFolder',
      'sortedRepoPaths'
    ])
  },
  watch: {
    currentRepo: function () {
      this.navigateIfNotMissing();
    }
  },
  created: function () {
    this.navigateIfNotMissing();
  }
};
</script>

<style scoped>
.actions-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>

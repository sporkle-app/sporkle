<template>
  <div class="sidebar-controls">

    <div class="button-group">
      <button @click="addRepo">Add</button>
      <button :disabled="true">Create</button>
      <button :disabled="true">Clone</button>
    </div>

    <div class="filter-and-settings">
      <div class="label-and-icons">
        <label for="repo-filter">
          Repo Filter:
        </label>
        <div>
          <RouterLink
            v-text="'🔧'"
            title="Settings"
            :to="{ name: 'settings' }"
          />
          <RouterLink
            v-text="'❔'"
            title="About"
            :to="{ name: 'about' }"
          />
        </div>
      </div>
      <input
        id="repo-filter"
        aria-labelledby="#repo-filter"
        class="repo-filter"
        type="text"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';

const openFolderExplorer = window.require('nw-programmatic-folder-select');

export default {
  name: 'SideBarControls',
  methods: {
    addRepo: function () {
      const title = 'Select your repo folder';
      openFolderExplorer(window, { title }, async (repoPath) => {
        if (repoPath) {
          await this.addRepoToListAndSave(repoPath);
          this.$router.push({ name: 'commits' });
        }
      });
    },
    ...mapActions(andSaveStore, [
      'addRepoToListAndSave'
    ])
  }
};
</script>

<style scoped>
.repo-filter {
  width: calc(100% - 20px);
  background: #FFF2;
  margin: 4px 10px 0px 10px;
}
.label-and-icons {
  display: flex;
  justify-content: space-between;
}
</style>

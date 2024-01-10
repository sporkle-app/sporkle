<template>
  <div class="sidebar-controls">

    <div class="button-group">
      <button @click="addRepo">Add</button>
      <button :disabled="true">Create</button>
      <button :disabled="true">Clone</button>
    </div>

    <div class="filter-and-settings">
      <label for="repo-filter">
        Repo Filter:
      </label>
      <input
        id="repo-filter"
        :disabled="true"
        type="text"
      />
      <RouterLink
        v-text="'🔧'"
        :to="{ name: 'settings' }"
      />
      <RouterLink
        v-text="'❔'"
        :to="{ name: 'about' }"
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
      openFolderExplorer(window, { title }, (repoPath) => {
        if (repoPath) {
          this.addRepoToListAndSave(repoPath);
        }
      });
    },
    ...mapActions(andSaveStore, [
      'addRepoToListAndSave'
    ])
  }
};
</script>

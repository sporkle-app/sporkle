<template>
  <div class="sidebar-controls">

    <div class="button-group">
      <button @click="addRepo">Add</button>
      <button @click="createRepo">Create</button>
      <button @click="cloneRepo">Clone</button>
    </div>

    <div>
      <label for="repo-filter" class="sr-only">
        Repo Filter:
      </label>
      <input
        id="repo-filter"
        aria-labelledby="repo-filter"
        class="repo-filter"
        type="text"
        placeholder="Filter repos"
        @input="($event) => setRepoFilter($event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';
import { reposStore } from '@/stores/repos.js';

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
    cloneRepo: function () {
      this.$router.push({ name: 'cloneRepo' });
    },
    createRepo: function () {
      this.$router.push({ name: 'createRepo' });
    },
    ...mapActions(andSaveStore, [
      'addRepoToListAndSave'
    ]),
    ...mapActions(reposStore, [
      'setRepoFilter'
    ])
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
}
.button-group button {
  flex-grow: 1;
  border-radius: 0px;
  margin: 0px;
}
.repo-filter {
  position: relative;
  width: 100%;
  background: #FFF2;
  border-radius: 0px;
  margin: 0px;
  z-index: 1;
}
</style>

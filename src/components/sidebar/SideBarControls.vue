<template>
  <div class="sidebar-controls">

    <div class="button-group">
      <button @click="addRepo">
        <BaseIcon
          name="RiFolderAddFill"
          scale="0.8"
        />
        Add
      </button>
      <button @click="createRepo">
        <BaseIcon
          name="RiAddCircleFill"
          scale="0.8"
        />
        Create
      </button>
      <button @click="cloneRepo">
        <BaseIcon
          name="RiFileCopyFill"
          scale="0.8"
        />
        Clone
      </button>

      <div class="sidebar-toggle-placehoder"></div>
    </div>

    <div>
      <label for="repo-filter" class="sr-only">
        Repo Filter:
      </label>
      <input
        v-model="repoFilterInput"
        id="repo-filter"
        aria-labelledby="repo-filter"
        class="repo-filter"
        type="text"
        placeholder="Filter repos"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';
import { reposStore } from '@/stores/repos.js';

import BaseIcon from '@/components/BaseIcon.vue';

const openFolderExplorer = window.require('nw-programmatic-folder-select');

export default {
  name: 'SideBarControls',
  components: {
    BaseIcon
  },
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
  },
  computed: {
    repoFilterInput: {
      get: function () {
        return this.repoFilter;
      },
      set: function (value) {
        this.setRepoFilter(value);
      }
    },
    ...mapState(reposStore, [
      'repoFilter'
    ])
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
}
.button-group button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-grow: 1;
  height: var(--top-button-height);
  border-radius: 0px;
  margin: 0px;
  padding: 0px;
}
.sidebar-toggle-placehoder {
  background: var(--button);
  width: var(--top-button-height);
  max-width: var(--top-button-height);
  min-width: var(--top-button-height);
  height: var(--top-button-height);
}
.repo-filter {
  position: relative;
  width: 100%;
  background: var(--white13);
  border-radius: 0px;
  margin: 0px;
  z-index: 1;
}
</style>

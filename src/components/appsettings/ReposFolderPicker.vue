<template>
  <div>
    <label for="repos-folder-input">
      <strong v-if="!reposFolder">
        Where do you store your repos?
      </strong>
      <strong v-else>
        Where to store/find repos:
      </strong>
    </label>
    <div class="repos-folder-select">
      <input
        id="repos-folder-input"
        class="repos-folder-input"
        disabled
        :title="reposFolder"
        :value="reposFolder"
      />
      <button @click="selectReposFolder">
        <BaseIcon
          name="RiFolderOpenFill"
          scale="0.85"
        />
        <template v-if="reposFolder">
          Change
        </template>
        <template v-else>
          Pick
        </template>
      </button>
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
  name: 'ReposFolderPicker',
  components: {
    BaseIcon
  },
  methods: {
    ...mapActions(andSaveStore, [
      'setReposFolderAndSave'
    ]),
    selectReposFolder: async function () {
      const title = 'Select the folder that contains all of your repos';
      openFolderExplorer(window, { title }, (repoPath) => {
        if (repoPath) {
          this.setReposFolderAndSave(repoPath);
        }
      });
    }
  },
  computed: {
    ...mapState(reposStore, [
      'reposFolder'
    ])
  }
};
</script>

<style scoped>
.repos-folder-select {
  display: flex;
}
.repos-folder-input {
  flex-grow: 1;
}
</style>

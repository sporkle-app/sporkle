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

    <BaseModal
      v-if="showSettings"
      title="Settings"
      @close="showSettings = false"
    >
      <template #body>
        <AppSettings />
      </template>
    </BaseModal>

    <BaseModal
      v-if="showAbout"
      title="About"
      @close="showAbout = false"
    >
      <template #body>
        <AboutApp />
      </template>
    </BaseModal>

  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';

import BaseModal from '@/components/BaseModal.vue';
import AboutApp from '@/views/AboutApp.vue';
import AppSettings from '@/views/AppSettings.vue';

const openFolderExplorer = window.require('nw-programmatic-folder-select');

export default {
  name: 'SideBarControls',
  components: {
    AboutApp,
    AppSettings,
    BaseModal
  },
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

import { defineStore } from 'pinia';

import helpers from '@/helpers/index.js';

const path = window.require('path');

export const sidebarStore = defineStore('sidebar', {
  state: function () {
    return {
      reposList: [],
      currentRepo: null
    };
  },
  actions: {
    setReposList: function (arr) {
      this.reposList = arr || [];
    },
    setCurrentRepo: function (value) {
      this.currentRepo = value;
    },
    /**
     * Add a new repo to the list of repos.
     *
     * @param {string} repoPath  File path to the repo
     */
    addRepoToList: function (repoPath) {
      const repo = {
        filePath: repoPath,
        title: path.basename(repoPath)
      };
      this.reposList.push(repo);
    },
    addRepoToListAndSave: function (repoPath) {
      if (helpers.validateRepoPath(repoPath)) {
        this.addRepoToList(repoPath);
        store.dispatch('appSettings/saveSettings', null, { root: true });
      } else {
        store.commit('setAppError', 'Path is not a valid git repository.\n' + repoPath, { root: true });
      }
    }
  }
});

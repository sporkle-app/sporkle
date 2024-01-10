import { defineStore, mapActions } from 'pinia';

import { branchesStore } from '@/stores/branches.js';

const path = window.require('path');

export const reposStore = defineStore('repos', {
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
    setCurrentRepo: function (repoPath) {
      this.currentRepo = repoPath;
      this.updateBranches(repoPath);
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
      this.setCurrentRepo(repoPath);
    },
    ...mapActions(branchesStore, [
      'updateBranches'
    ])
  }
});

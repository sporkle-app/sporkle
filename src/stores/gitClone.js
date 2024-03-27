import { defineStore, mapActions } from 'pinia';

import { appLoadingStore } from './appLoading.js';

const simpleGit = require('simple-git');

export const gitCloneStore = defineStore('gitClone', {
  actions: {
    ...mapActions(appLoadingStore, [
      'setGitCloneLoading'
    ]),
    cloneRepo: function (repoUrl, repoPath) {
      this.setGitCloneLoading(true);
      return new Promise((resolve, reject) => {
        simpleGit()
          .clone(repoUrl, repoPath)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.setGitCloneLoading(false);
          });
      });
    }
  }
});

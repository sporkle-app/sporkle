import { defineStore, mapActions } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';

import helpers from '@/helpers/index.js';

const git2json = require('@fabien0102/git2json');

export const commitsStore = defineStore('commits', {
  state: function () {
    return {
      commits: []
    };
  },
  actions: {
    ...mapActions(appLoadingStore, [
      'setAppLoading'
    ]),
    getCommits: async function (currentRepoPath) {
      this.setAppLoading(true);
      helpers.setCurrentWorkingDirectory(currentRepoPath);

      let response = [];

      try {
        response = await git2json.run();
      } catch (error) {
        if (error) {
          alertsStore().setAppError('Git Error: ' + error);
        }
      }

      this.commits = response || [];
      this.setAppLoading(false);
    }
  }
});

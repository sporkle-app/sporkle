import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
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
    ...mapActions(alertsStore, [
      'setAppError'
    ]),
    ...mapActions(appLoadingStore, [
      'setCommitsLoading'
    ]),
    getCommits: async function (currentRepoPath) {
      this.commits = [];
      this.setCommitsLoading(true);
      helpers.setCurrentWorkingDirectory(currentRepoPath);

      let response = [];

      try {
        response = await git2json.run();
      } catch (error) {
        if (error) {
          this.setAppError('Git Error: ' + error);
        }
      }

      this.commits = response || [];
      this.setCommitsLoading(false);
    }
  }
});

import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';

import { getAheadByCommits } from '@/helpers/gitCommands.js';
import helpers from '@/helpers/index.js';

const git2json = require('@fabien0102/git2json');

export const commitsStore = defineStore('commits', {
  state: function () {
    return {
      aheadBy: 0,
      commits: []
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setCommitsLoading'
    ]),
    resetState: function () {
      this.aheadBy = 0;
      this.commits = [];
    },
    // How many commits is the local ahead of the remote, is the amount that has not been pushed yet
    getCommitsAhead: function (currentRepoPath) {
      return getAheadByCommits(currentRepoPath)
        .then((aheadBy) => {
          this.aheadBy = aheadBy;
        })
        .catch((error) => {
          this.addErrorAlert('Error checking repo status.', error);
        });
    },
    getCommits: async function (currentRepoPath) {
      this.resetState();
      this.setCommitsLoading(true);
      await this.getCommitsAhead(currentRepoPath);
      helpers.setCurrentWorkingDirectory(currentRepoPath);

      let response = [];

      try {
        response = await git2json.run();
      } catch (error) {
        if (error) {
          this.addErrorAlert('Error checking repo commit history.', error);
        }
      }

      this.commits = response || [];
      this.setCommitsLoading(false);
    }
  },
  getters: {
    uncommitedFiles: function () {
      return [];
    },
    unsyncedCommits: function (state) {
      const startFrom = 0;
      return state.commits.slice(startFrom, this.aheadBy);
    },
    syncedCommits: function (state) {
      return state.commits.slice(this.aheadBy);
    }
  }
});

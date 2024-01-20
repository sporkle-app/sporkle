import { defineStore, mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { gitRemotesStore } from '@/stores/gitRemotes.js';
import { gitStatusStore } from '@/stores/gitStatus.js';

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
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setCommitsLoading'
    ]),
    ...mapActions(gitStatusStore, [
      'updateStatus'
    ]),
    resetState: function () {
      this.commits = [];
    },
    getCommits: async function (currentRepoPath) {
      this.resetState();
      this.setCommitsLoading(true);
      await this.updateStatus(currentRepoPath);
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
    ...mapState(gitStatusStore, [
      'ahead'
    ]),
    ...mapState(gitRemotesStore, [
      'hasRemotes'
    ]),
    uncommitedFiles: function () {
      return [];
    },
    unsyncedCommits: function (state) {
      if (!this.hasRemotes) {
        return state.commits;
      }
      const startFrom = 0;
      return state.commits.slice(startFrom, this.ahead);
    },
    syncedCommits: function (state) {
      if (!this.hasRemotes) {
        return [];
      }
      return state.commits.slice(this.ahead);
    }
  }
});

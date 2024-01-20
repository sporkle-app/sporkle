import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';

const simpleGit = require('simple-git');

export const gitRemotesStore = defineStore('gitRemotes', {
  state: function () {
    return {
      remotes: []
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setGitRemotesLoading'
    ]),
    resetRemotes: function () {
      this.remotes = [];
    },
    setRemotes: function (remotes) {
      this.remotes = remotes || [];
    },
    updateRemotes: function (currentRepoPath) {
      if (!currentRepoPath) {
        return;
      }
      this.setGitRemotesLoading(true);
      this.resetRemotes();
      return simpleGit(currentRepoPath)
        .getRemotes()
        .then((remotes) => {
          this.setRemotes(remotes);
        })
        .catch((error) => {
          this.addErrorAlert('Error checking for remote repos.', error);
        })
        .finally(() => {
          this.setGitRemotesLoading(false);
        });
    }
  },
  getters: {
    hasRemotes: function (state) {
      return !!state.remotes.length;
    }
  }
});

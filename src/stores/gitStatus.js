import _camelCase from 'lodash-es/camelCase.js';
import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';

const simpleGit = require('simple-git');

export const gitStatusStore = defineStore('gitStatus', {
  state: function () {
    return {
      notAdded: [],
      conflicted: [],
      created: [],
      deleted: [],
      modified: [],
      renamed: [],
      files: [],
      staged: [],
      ahead: 0,
      behind: 0,
      current: '',
      tracking: '',
      detached: false
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setGitStatusLoading'
    ]),
    resetStatus: function () {
      this.notAdded = [];
      this.conflicted = [];
      this.created = [];
      this.deleted = [];
      this.modified = [];
      this.renamed = [];
      this.files = [];
      this.staged = [];
      this.ahead = 0;
      this.behind = 0;
      this.current = '';
      this.tracking = '';
      this.detached = false;
    },
    setStatus: function (status) {
      Object.keys(status).forEach((key) => {
        this[_camelCase(key)] = status[key];
      });
    },
    updateStatus: function (currentRepoPath) {
      if (!currentRepoPath) {
        return;
      }
      this.setGitStatusLoading(true);
      return simpleGit(currentRepoPath)
        .status()
        .then((status) => {
          this.setStatus(status);
        })
        .catch((error) => {
          this.addErrorAlert('Error checking repo status.', error);
        })
        .finally(() => {
          this.setGitStatusLoading(false);
        });
    }
  },
  getters: {
  }
});

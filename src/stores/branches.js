import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';

import helpers from '@/helpers/index.js';

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

export const branchesStore = defineStore('branches', {
  state: function () {
    return {
      branches: []
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'setAppError'
    ]),
    ...mapActions(appLoadingStore, [
      'setAppLoading'
    ]),
    setBranches: function (branches) {
      this.branches = branches || [];
    },
    updateBranches: async function (currentRepoPath) {
      this.setAppLoading(true);
      helpers.setCurrentWorkingDirectory(currentRepoPath);

      const { error, stdout, stderr } = await exec('git branch');

      if (error || stderr) {
        this.setAppError('Git Error: ' + (error || stderr));
      }

      const branches = (stdout || '')
        .replaceAll('*', '')
        .replaceAll('\r', '')
        .split('\n')
        .map((branch) => {
          return branch.trim();
        })
        .filter(Boolean);

      this.setBranches(branches);
      this.setAppLoading(false);
    }
  }
});

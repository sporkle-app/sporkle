import { defineStore } from 'pinia';

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
    setBranches: function (branches) {
      this.branches = branches || [];
    },
    updateBranches: async function (currentRepoPath) {
      appLoadingStore().setAppLoading(true);

      helpers.setCurrentWorkingDirectory(currentRepoPath);

      const { error, stdout, stderr } = await exec('git branch');

      appLoadingStore().setAppLoading(false);

      if (error !== null || stderr !== null) {
        alertsStore().setAppError('Git Error: ' + (error || stderr));
      }

      this.setBranches(stdout);
    }
  }
});

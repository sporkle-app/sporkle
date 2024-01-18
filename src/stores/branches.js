import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';

import { gitBranches } from '@/helpers/gitCommands.js';

export const branchesStore = defineStore('branches', {
  state: function () {
    return {
      branches: []
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setBranchesLoading'
    ]),
    setBranches: function (branches) {
      this.branches = branches || [];
    },
    updateBranches: async function (currentRepoPath) {
      this.setBranchesLoading(true);
      gitBranches(currentRepoPath)
        .then((branches) => {
          this.setBranches(branches);
        })
        .catch((error) => {
          this.addErrorAlert('Error checking Git branches.', error);
        })
        .finally(() => {
          this.setBranchesLoading(false);
        });
    }
  }
});

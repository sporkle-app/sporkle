import { defineStore } from 'pinia';

export const appLoadingStore = defineStore('appLoading', {
  state: function () {
    return {
      branchesLoading: false,
      commitsLoading: false,
      reposLoading: false,
      routingLoading: false,
      settingsLoading: false
    };
  },
  actions: {
    setBranchesLoading: function (bool) {
      this.branchesLoading = bool;
    },
    setCommitsLoading: function (bool) {
      this.commitsLoading = bool;
    },
    setReposLoading: function (bool) {
      this.reposLoading = bool;
    },
    setRoutingLoading: function (bool) {
      this.routingLoading = bool;
    },
    setSettingsLoading: function (bool) {
      this.settingsLoading = bool;
    }
  },
  getters: {
    appLoading: function (state) {
      return (
        state.branchesLoading ||
        state.commitsLoading ||
        state.reposLoading ||
        state.routingLoading ||
        state.settingsLoading
      );
    }
  }
});

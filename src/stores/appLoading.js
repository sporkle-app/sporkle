import { defineStore } from 'pinia';

export const appLoadingStore = defineStore('appLoading', {
  state: function () {
    return {
      appLoading: false
    };
  },
  actions: {
    setAppLoading: function (bool) {
      this.appLoading = bool;
    }
  }
});

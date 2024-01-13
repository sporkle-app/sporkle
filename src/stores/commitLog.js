import { defineStore } from 'pinia';

export const commitLogStore = defineStore('commitLog', {
  state: function () {
    return {
      commitLogCollapsed: false
    };
  },
  actions: {
    toggleCommitLogCollapsed: function () {
      this.commitLogCollapsed = !this.commitLogCollapsed;
    }
  }
});

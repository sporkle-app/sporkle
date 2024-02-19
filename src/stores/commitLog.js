import { defineStore } from 'pinia';

export const commitLogStore = defineStore('commitLog', {
  state: function () {
    return {
      commitLogCollapsed: false,
      hoveredCommitHash: '',
      selectedCommitHash: ''
    };
  },
  actions: {
    toggleCommitLogCollapsed: function () {
      this.commitLogCollapsed = !this.commitLogCollapsed;
    },
    setHoveredCommitHash: function (hash) {
      this.hoveredCommitHash = hash;
    },
    clearHoveredCommitHash: function (hash) {
      if (this.hoveredCommitHash === hash) {
        this.hoveredCommitHash = '';
      }
    },
    setSelectedCommitHash: function (hash) {
      this.selectedCommitHash = hash;
    },
    clearSelectedCommitHash: function () {
      this.selectedCommitHash = '';
    }
  }
});

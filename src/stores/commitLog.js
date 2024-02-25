import { defineStore, mapState } from 'pinia';

import { commitsStore } from '@/stores/commits.js';

import { DEV_NULL } from '@/helpers/constants.js';

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
  },
  getters: {
    ...mapState(commitsStore, [
      'commits'
    ]),
    // This is the commit just before the selected commit
    comparisonHash: function () {
      if (this.selectedCommitHash) {
        const commitIndex = this.commits.findIndex((commit) => {
          return commit.hash === this.selectedCommitHash;
        });
        if (
          commitIndex !== -1 &&
          commitIndex !== (this.commits.length - 1)
        ) {
          return this.commits[commitIndex + 1]?.hash || DEV_NULL;
        }
      }
      return DEV_NULL;
    }
  }
});

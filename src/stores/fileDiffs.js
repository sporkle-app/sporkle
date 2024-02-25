import { defineStore, mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { commitLogStore } from '@/stores/commitLog.js';
import { commitsStore } from '@/stores/commits.js';

import { DEV_NULL } from '@/helpers/constants.js';
import helpers from '@/helpers/index.js';

const gitDiffParser = window.require('gitdiff-parser');

function generateGitDiffCommandArray () {
  return [
    'git',
    'diff',
    // Look for any removed files that are 50% identical to any added files and assume it was renamed
    '-M',
    // do a more thorough search
    '--find-copies-harder',
    /**
     * Could run:
     * * git diff --shortstat --minimal
     * * git diff --shortstat --patience
     * * git diff --shortstat --histogram
     * and compare them every time and use whatever is the smallest diff.
     * Probably default to patience if all are the same.
     */
    '--histogram'
  ];
}

export const fileDiffsStore = defineStore('fileDiffs', {
  state: function () {
    return {
      diffs: []
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setFileDiffsLoading'
    ]),
    setDiffs: function (value) {
      this.diffs = value || [];
    },
    getSpecificFileDiff: function (file) {
      const command = [
        'git',
        '--no-pager',
        'diff',
        '--no-index',
        DEV_NULL,
        file
      ].join(' ');
      return helpers.runCommand(command);
    },
    getSpecificFileDiffsFromCommit: function () {
      const commit = this.commits.find((commit) => {
        return commit.hash === this.selectedCommitHash;
      });
      if (!commit) {
        return new Promise((resolve, reject) => {
          reject('Could not find matching commit');
        });
      }
      const files = commit.stats.map(function (stat) {
        return stat.file;
      });
      const promises = [];
      files.forEach((file) => {
        promises.push(this.getSpecificFileDiff(file));
      });
      return Promise.all(promises)
        .then((results) => {
          return results.join('\n\n');
        });
    },
    getUncommittedDiffs: function () {
      const command = generateGitDiffCommandArray().join(' ');
      return helpers.runCommand(command);
    },
    getCommitDiffs: async function () {
      let command = [
        ...generateGitDiffCommandArray(),
        // The hash of the commit just before the one clicked
        this.comparisonHash,
        // The hash of the commit clicked on in the commit log/timeline
        this.selectedCommitHash
      ].join(' ');
      return helpers.runCommand(command);
    },
    getFirstCommitDiff: function () {
      // git show works great for this simple use case, but git diff is better for the other commits
      const command = [
        'git',
        'show',
        this.selectedCommitHash
      ].join(' ');
      return helpers.runCommand(command);
    },
    getDiffs: function () {
      if (this.firstEverCommitSelected) {
        return this.getFirstCommitDiff();
      }
      if (this.selectedCommitHash) {
        return this.getCommitDiffs();
      }
      return this.getUncommittedDiffs();
    },
    getAndParseDiffs: async function (currentRepoPath) {
      this.setFileDiffsLoading(true);
      this.setDiffs();
      let result;
      try {
        if (currentRepoPath) {
          helpers.setCurrentWorkingDirectory(currentRepoPath);
        }
        const gitDiffText = await this.getDiffs();
        if (gitDiffText) {
          result = await gitDiffParser.parse(gitDiffText);
        }
      } catch (error) {
        this.addErrorAlert('Error reading or parsing file diffs.', error);
      }
      this.setDiffs(result);
      this.setFileDiffsLoading(false);
    }
  },
  getters: {
    ...mapState(commitsStore, [
      'commits'
    ]),
    ...mapState(commitLogStore, [
      'comparisonHash',
      'firstEverCommitSelected',
      'selectedCommitHash'
    ])
  }
});

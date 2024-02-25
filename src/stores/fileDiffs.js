import { defineStore, mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { commitLogStore } from '@/stores/commitLog.js';
import { commitsStore } from '@/stores/commits.js';

import { DEV_NULL } from '@/helpers/constants.js';
import helpers from '@/helpers/index.js';

const gitDiffParser = window.require('gitdiff-parser');

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
    getNormalDiffs: async function () {
      let command = [
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
      if (this.selectedCommitHash) {
        // The hash of the commit just before the one clicked
        command.push(this.comparisonHash);
        // The hash of the commit clicked on in the commit log/timeline
        command.push(this.selectedCommitHash);
      }
      command = command.join(' ');
      return helpers.runCommand(command);
    },
    getDiffs: function () {
      if (this.selectedCommitHash && this.comparisonHash === DEV_NULL) {
        return this.getSpecificFileDiffsFromCommit();
      }
      return this.getNormalDiffs();
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
      'selectedCommitHash',
      'comparisonHash'
    ])
  }
});

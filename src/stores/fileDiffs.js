import { defineStore, mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { commitLogStore } from '@/stores/commitLog.js';
import { commitsStore } from '@/stores/commits.js';

import {
  DEV_NULL,
  UNCOMMITED
} from '@/helpers/constants.js';
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
    ...mapActions(commitLogStore, [
      'setUncommitedFilesAmount'
    ]),
    clearDiffs: function () {
      this.setDiffs();
    },
    setDiffs: function (value) {
      this.diffs = value || [];
      if (this.uncommittedSelected) {
        this.setUncommitedFilesAmount(this.diffs.length);
      }
    },
    getUntrackedFileDiff: async function (file) {
      const command = [
        'git',
        '--no-pager',
        'diff',
        '--no-index',
        DEV_NULL,
        '"' + file + '"'
      ].join(' ');
      let error;
      let diff;
      try {
        diff = await helpers.runCommand(command);
      } catch (err) {
        error = err;
      }
      return new Promise((resolve, reject) => {
        if (diff) {
          resolve(diff);
        } else if (error) {
          reject(error);
        }
      })
    },
    getUntrackedFilesDiffs: async function () {
      let untrackedFiles = await helpers.runCommand('git ls-files --others --exclude-standard');
      untrackedFiles = untrackedFiles
        .split('\n')
        .filter(Boolean);
      const results = [];
      for (let file of untrackedFiles) {
        try {
          const result = await this.getUntrackedFileDiff(file);
          results.push(result);
        } catch (error) {
          console.log(error);
        }
      }
      return new Promise((resolve, reject) => {
        resolve(results.join('\n\n'));
      });
    },
    getUncommittedDiffs: function () {
      const command = generateGitDiffCommandArray().join(' ');
      const basicDiff = helpers.runCommand(command);
      const promises = [
        basicDiff,
        this.getUntrackedFilesDiffs()
      ];
      return Promise.all(promises)
        .then((results) => {
          return results.join('\n\n');
        });
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
      if (this.uncommittedSelected) {
        return this.getUncommittedDiffs();
      }
      if (this.firstEverCommitSelected) {
        return this.getFirstCommitDiff();
      }
      if (this.selectedCommitHash) {
        return this.getCommitDiffs();
      }
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
    ]),
    uncommittedSelected: function () {
      return this.selectedCommitHash === UNCOMMITED;
    }
  }
});

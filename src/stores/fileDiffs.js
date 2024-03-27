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

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

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
      /**
       * So this is fun, when using `--no-index` git decided that
       * instead of exit code 0 for OK and 1 for Error, they output
       * 0 if the files match and 1 if they don't. So we need to
       * manually call this command and handle the "error" as a
       * success.
       */
      const command = [
        'git',
        '--no-pager',
        'diff',
        '--no-index',
        DEV_NULL,
        '"' + file + '"'
      ].join(' ');
      console.info(command);

      let diff;
      let error;
      await exec(command)
        .then(({ stdout }) => {
          diff = stdout;
        })
        .catch((err) => {
          diff = err?.stdout;
          error = err?.message;
        });

      return new Promise((resolve, reject) => {
        if (diff.startsWith('diff --git ')) {
          resolve(diff);
        } else {
          reject(error);
        }
      });
    },
    getUntrackedFilesDiffs: async function () {
      let untrackedFiles = await helpers.runCommand('git ls-files --others --exclude-standard');
      untrackedFiles = untrackedFiles
        .split('\n')
        .filter(Boolean);
      const promises = [];
      for (let file of untrackedFiles) {
        promises.push(this.getUntrackedFileDiff(file));
      }
      return promises;
    },
    getUncommittedDiffs: async function () {
      const basicCommand = generateGitDiffCommandArray().join(' ');
      const stagedCommand = [
        ...generateGitDiffCommandArray(),
        '--cached'
      ].join(' ');

      const basicDiff = helpers.runCommand(basicCommand);
      const diffOfAlreadyStagedFiles = helpers.runCommand(stagedCommand);
      const untrackedFileDiffs = await this.getUntrackedFilesDiffs();
      const promises = [
        basicDiff,
        diffOfAlreadyStagedFiles,
        ...untrackedFileDiffs
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

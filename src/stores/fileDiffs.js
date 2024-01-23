import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import helpers from '@/helpers/index.js';

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

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
    setDiffs: function (value) {
      this.diffs = value || [];
    },
    getDiffs: async function (currentRepoPath) {
      helpers.setCurrentWorkingDirectory(currentRepoPath);
      const command = 'git diff';
      let error;
      let diff;
      try {
        const { stdout, stderr } = await exec(command);
        diff = String(stdout || '');
        error = stderr;
      } catch (err) {
        error = err;
      }
      return new Promise((resolve, reject) => {
        if (error) {
          reject(error);
        } else {
          resolve(diff);
        }
      });
    },
    getAndParseDiffs: async function (currentRepoPath) {
      this.setDiffs();
      let result;
      try {
        const gitDiffText = await this.getDiffs(currentRepoPath);
        if (gitDiffText) {
          result = await gitDiffParser.parse(gitDiffText);
        }
      } catch (error) {
        this.addErrorAlert('Error reading or parsing file diffs.', error);
      }
      this.setDiffs(result);
    }
  }
});

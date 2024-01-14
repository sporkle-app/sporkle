import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';

import helpers from '@/helpers/index.js';

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

const git2json = require('@fabien0102/git2json');

export const commitsStore = defineStore('commits', {
  state: function () {
    return {
      aheadBy: 0,
      commits: []
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'setAppError'
    ]),
    ...mapActions(appLoadingStore, [
      'setCommitsLoading'
    ]),
    resetState: function () {
      this.aheadBy = 0;
      this.commits = [];
    },
    // How many commits is the local ahead of the remote, is the amount that has not been pushed yet
    getCommitsAhead: async function () {
      // The (.*) is a group, so it's value will be in the 1 index position of the match
      const regexTest = /Your branch is ahead of .* by (.*) commits\./;
      const { error, stdout, stderr } = await exec('git status');

      if (error || stderr) {
        this.setAppError('Git Error: ' + (error || stderr));
      }

      let match = stdout.match(regexTest) || [];
      let aheadBy = match[1] || '0';
      // I don't actually know if large commits can contain delimeters, just doing this for safety
      aheadBy = aheadBy.replaceAll(',', '');
      aheadBy = aheadBy.replaceAll('.', '');
      // Probably could use a safety check here
      this.aheadBy = parseInt(aheadBy);
    },
    getCommits: async function (currentRepoPath) {
      this.resetState();
      this.setCommitsLoading(true);
      await this.getCommitsAhead();
      helpers.setCurrentWorkingDirectory(currentRepoPath);

      let response = [];

      try {
        response = await git2json.run();
      } catch (error) {
        if (error) {
          this.setAppError('Git Error: ' + error);
        }
      }

      this.commits = response || [];
      this.setCommitsLoading(false);
    }
  },
  getters: {
    uncommitedFiles: function () {
      return [];
    },
    unsyncedCommits: function (state) {
      const startFrom = 0;
      return state.commits.slice(startFrom, this.aheadBy);
    },
    syncedCommits: function (state) {
      return state.commits.slice(this.aheadBy);
    }
  }
});

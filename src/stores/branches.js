import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { fileDiffsStore } from '@/stores/fileDiffs.js';

import helpers from '@/helpers/index.js';

const util = window.require('node:util');
const exec = util.promisify(window.require('node:child_process').exec);

const simpleGit = require('simple-git');

async function getOneBranchName (command, currentRepoPath) {
  helpers.setCurrentWorkingDirectory(currentRepoPath);
  let error;
  let branch;
  try {
    const { stdout, stderr } = await exec(command);
    // 'origin/main\n' => 'main\n'
    const sections = (stdout || '').split('/');
    branch = sections[sections.length - 1];
    // 'main\n' => 'main'
    branch = branch.trim();
    error = stderr;
  } catch (err) {
    error = err;
  }
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(branch);
    }
  });
}

export const branchesStore = defineStore('branches', {
  state: function () {
    return {
      branches: [],
      currentBranch: '',
      defaultBranch: ''
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setBranchesLoading'
    ]),
    ...mapActions(fileDiffsStore, [
      'getAndParseDiffs'
    ]),
    setBranches: function (branches) {
      this.branches = branches || [];
    },
    setCurrentBranch: function (branch) {
      this.currentBranch = branch || '';
    },
    setDefaultBranch: function (branch) {
      this.defaultBranch = (
        branch ||
        this.probableDefaultBranch ||
        this.currentBranch ||
        ''
      );
    },
    updateCurrentBranch: function (currentRepoPath) {
      this.setCurrentBranch('');
      const command = 'git rev-parse --abbrev-ref HEAD';
      return getOneBranchName(command, currentRepoPath)
        .then((branch) => {
          this.setCurrentBranch(branch);
          this.getAndParseDiffs(currentRepoPath);
        })
        .catch((error) => {
          this.addErrorAlert('Error checking current Git branch.', error);
        });
    },
    updateDefaultBranch: async function (currentRepoPath) {
      this.setDefaultBranch('');
      const command = 'git rev-parse --abbrev-ref origin/HEAD';
      return getOneBranchName(command, currentRepoPath)
        .then((branch) => {
          this.setDefaultBranch(branch);
        })
        .catch((error) => {
          if (this.probableDefaultBranch || this.currentBranch) {
            this.setDefaultBranch();
          } else {
            // Not worth showing a UI alert to users for this
            console.log('Error checking default Git branch.');
            console.warn(error);
          }
        });
    },
    updateBranches: async function (currentRepoPath) {
      this.setBranchesLoading(true);

      return simpleGit(currentRepoPath)
        .branchLocal()
        .then((result) => {
          this.setBranches(result.branches);
        })
        .catch((error) => {
          this.addErrorAlert('Error checking Git branches.', error);
        })
        .finally(() => {
          this.setBranchesLoading(false);
        });
    }
  },
  getters: {
    branchNames: function (state) {
      const allBranchNames = Object
        .keys(state.branches)
        .map((branchName) => {
          const sections = branchName.split('/');
          return sections[sections.length - 1];
        });
      return Array.from(new Set(allBranchNames));
    },
    probableDefaultBranch: function () {
      let probableBranch = '';
      if (this.branchNames.includes('develop')) {
        probableBranch = 'develop';
      }
      if (this.branchNames.includes('trunk')) {
        probableBranch = 'trunk';
      }
      if (this.branchNames.includes('master')) {
        probableBranch = 'master';
      }
      if (this.branchNames.includes('main')) {
        probableBranch = 'main';
      }
      return probableBranch;
    }
  }
});

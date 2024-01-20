import { defineStore, mapActions, mapState } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';
import { branchesStore } from '@/stores/branches.js';
import { commitsStore } from '@/stores/commits.js';
import { gitRemotesStore } from '@/stores/gitRemotes.js';
import { gitStatusStore } from '@/stores/gitStatus.js';

const path = window.require('path');

export const reposStore = defineStore('repos', {
  state: function () {
    return {
      reposList: [],
      repoFilter: '',
      currentRepo: null
    };
  },
  actions: {
    setReposList: function (arr) {
      this.reposList = arr || [];
    },
    setCurrentRepo: async function (repoPath) {
      this.setReposLoading(true);
      this.currentRepo = repoPath;

      const parallelPromises = [
        this.updateBranches(repoPath),
        this.updateCurrentBranch(repoPath),
        this.updateRemotes(repoPath),
        this.updateStatus(repoPath)
      ];
      await Promise.all(parallelPromises);

      // Needs updateStatus to finish before running
      await this.getCommits(repoPath);

      // Needs updateRemotes to finish before running
      if (this.hasRemotes) {
        await this.updateDefaultBranch(repoPath);
      } else {
        this.setDefaultBranch('');
      }

      this.setReposLoading(false);
    },
    setRepoFilter: function (value) {
      this.repoFilter = value;
    },
    /**
     * Add a new repo to the list of repos.
     *
     * @param {string} repoPath  File path to the repo
     */
    addRepoToList: function (repoPath) {
      this.setReposLoading(true);
      const match = this.reposList.find((repo) => {
        return repo.filePath === repoPath;
      });
      if (match) {
        this.setCurrentRepo(repoPath);
        this.setReposLoading(false);
        return;
      }

      const repo = {
        filePath: repoPath,
        title: path.basename(repoPath)
      };
      this.reposList.push(repo);
      this.setCurrentRepo(repoPath);
      this.setReposLoading(false);
    },
    removeRepoFromList: function (repoPath) {
      this.setReposLoading(true);
      this.setReposList(this.reposList.filter(function (repo) {
        return repo.filePath !== repoPath;
      }));
      this.setReposLoading(false);
    },
    ...mapActions(appLoadingStore, [
      'setReposLoading'
    ]),
    ...mapActions(branchesStore, [
      'updateBranches',
      'updateCurrentBranch',
      'updateDefaultBranch',
      'setDefaultBranch'
    ]),
    ...mapActions(commitsStore, [
      'getCommits'
    ]),
    ...mapActions(gitRemotesStore, [
      'updateRemotes'
    ]),
    ...mapActions(gitStatusStore, [
      'updateStatus'
    ])
  },
  getters: {
    ...mapState(gitRemotesStore, [
      'hasRemotes'
    ]),
    filteredReposList: function (state) {
      const filter = state.repoFilter.toLowerCase();
      return state.reposList
        .toSorted(function (a, b) {
          a = a.title.toLowerCase();
          b = b.title.toLowerCase();
          return (a > b) ? 1 : (a < b) ? -1 : 0;
        })
        .filter(function (repo) {
          const title = repo.title.toLowerCase();
          return title.includes(filter);
        });
    }
  }
});

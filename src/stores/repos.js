import { defineStore, mapActions } from 'pinia';

import { branchesStore } from '@/stores/branches.js';
import { commitsStore } from '@/stores/commits.js';

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
    setCurrentRepo: function (repoPath) {
      this.currentRepo = repoPath;
      this.updateBranches(repoPath);
      this.getCommits();
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
      const match = this.reposList.find((repo) => {
        return repo.filePath === repoPath;
      });
      if (match) {
        this.setCurrentRepo(repoPath);
        return;
      }

      const repo = {
        filePath: repoPath,
        title: path.basename(repoPath)
      };
      this.reposList.push(repo);
      this.setCurrentRepo(repoPath);
    },
    removeRepoFromList: function (repoPath) {
      this.setReposList(this.reposList.filter(function (repo) {
        return repo.filePath !== repoPath;
      }));
    },
    ...mapActions(branchesStore, [
      'updateBranches'
    ]),
    ...mapActions(commitsStore, [
      'getCommits'
    ])
  },
  getters: {
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

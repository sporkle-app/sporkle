import { defineStore, mapActions, mapState } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';
import { branchesStore } from '@/stores/branches.js';
import { commitLogStore } from '@/stores/commitLog.js';
import { commitsStore } from '@/stores/commits.js';
import { fileDiffsStore } from '@/stores/fileDiffs.js';
import { gitRemotesStore } from '@/stores/gitRemotes.js';
import { gitStatusStore } from '@/stores/gitStatus.js';

import helpers from '@/helpers/index.js';

const execSync = window.require('node:child_process').execSync;
const fs = window.require('fs');
const path = window.require('path');
const os = window.require('os');

const diacriticLess = window.require('diacriticless');

export const reposStore = defineStore('repos', {
  state: function () {
    return {
      // The repos selected in the sidebar
      currentRepo: null,
      // Repos displayed on the Bulk Add screen
      potentialRepoFolders: [],
      // Text to filter the sidebar by
      repoFilter: '',
      // The main folder where repos are stored
      reposFolder: null,
      // The unfiltered list of all added repos
      reposList: []
    };
  },
  actions: {
    setReposList: function (arr) {
      this.reposList = arr || [];
    },
    setCurrentRepo: async function (repoPath) {
      this.setReposLoading(true);
      if (this.currentRepo !== repoPath) {
        // Clear out old file diffs when switching repos
        await this.setDiffs();
      }
      this.currentRepo = repoPath;
      if (!window.require('fs').existsSync(repoPath)) {
        this.setReposLoading(false);
        return;
      }
      helpers.setCurrentWorkingDirectory(repoPath);
      this.clearSelectedCommitHash();

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
      if (!match) {
        const repo = {
          filePath: repoPath,
          title: path.basename(repoPath)
        };
        this.reposList.push(repo);
      }
      this.setCurrentRepo(repoPath);
      this.setReposLoading(false);
    },
    bulkAddRepos: function (newRepos) {
      this.setReposLoading(true);
      for (let i = 0; i < newRepos.length; i++) {
        const newRepo = newRepos[i];
        const match = this.reposList.find((repo) => {
          return repo.filePath === newRepo.filePath;
        });
        if (!match) {
          this.reposList.push({
            filePath: newRepo.filePath,
            title: newRepo.title
          });
        }
      }
      this.scanForRepos();
      this.resetCurrentRepo();
      this.setReposLoading(false);
    },
    resetCurrentRepo: function () {
      // Load the first repo in the list that exists
      if (
        !this.currentRepo ||
        !this.sortedRepoPaths.includes(this.currentRepo)
      ) {
        for (let sortedRepoPath of this.sortedRepoPaths) {
          if (fs.existsSync(sortedRepoPath)) {
            this.setCurrentRepo(sortedRepoPath);
            return;
          }
        }
      }
      // unset the current repo if none exist
      this.setCurrentRepo(null);
    },
    removeRepoFromList: function (repoPath) {
      this.setReposLoading(true);
      this.setReposList(this.reposList.filter(function (repo) {
        return repo.filePath !== repoPath;
      }));
      this.resetCurrentRepo();
      this.setReposLoading(false);
    },
    setReposFolder: function (repoPath) {
      this.reposFolder = repoPath || null;
    },
    scanForRepos: async function () {
      if (!this.reposFolder || this.scanForReposLoading) {
        return;
      }

      this.setScanForReposLoading(true);
      await fs.promises.readdir(this.reposFolder)
        .then((files) => {
          this.potentialRepoFolders = files
            .toSorted(helpers.lowerCaseSort)
            .filter((file) => {
              const filePath = path.join(this.reposFolder, file);
              const gitPath = path.join(filePath, '.git');
              const alreadyAddedToSidebar = this.sortedRepoPaths.includes(filePath);

              return (
                !alreadyAddedToSidebar &&
                fs.lstatSync(filePath).isDirectory() &&
                fs.existsSync(gitPath) &&
                fs.lstatSync(gitPath).isDirectory()
              );
            })
            .map((folderName) => {
              const filePath = path.join(this.reposFolder, folderName);
              return {
                selected: false,
                title: folderName,
                filePath,
                lastCommit: null
              };
            }) || [];
        })
        .catch((error) => {
          console.info({ error });
        });

      for (let i = 0; i < this.potentialRepoFolders.length; i++) {
        const repo = this.potentialRepoFolders[i];
        try {
          helpers.setCurrentWorkingDirectory(repo.filePath);
          const command = 'git log -1 --format=%ct';
          const stdout = execSync(command);
          const epoch = String(stdout || '').trim();
          if (epoch) {
            this.potentialRepoFolders[i].lastCommit = epoch * 1000;
          }
        } catch (error) {
          console.info({ error });
        }
      }
      this.setScanForReposLoading(false);
    },
    guessReposFolder: function () {
      if (this.reposFolder) {
        return;
      }
      const home = os.homedir();
      const desktop = path.join(home, 'Desktop');
      const documents = path.join(home, 'Documents');

      const parents = [
        home,
        desktop,
        documents
      ];
      const folderNames = [
        // common
        'GitHub',
        'repos',
        // less common
        'github',
        'Github',
        'Repos',
        // uncommon
        'repositories',
        'Repositories'
      ];

      const allPathsToCheck = [];
      folderNames.forEach((folderName) => {
        parents.forEach((parent) => {
          const fullPath = path.join(parent, folderName);
          allPathsToCheck.push(fullPath);
        });
      });

      for (const filePath of allPathsToCheck) {
        const exists = fs.existsSync(filePath);
        if (!exists) {
          continue;
        }
        const isFolder = fs.lstatSync(filePath).isDirectory();
        if (!isFolder) {
          continue;
        }
        try {
          const children = fs.readdirSync(filePath);
          const containsAtLeastOneRepo = children.some((child) => {
            // childPath = C:\Users\Bob\Repos\my-project
            const childPath = path.join(filePath, child);
            // gitFolder = C:\Users\Bob\Repos\my-project\.git
            const gitFolder = path.join(childPath, '.git');
            return (
              fs.lstatSync(childPath).isDirectory() &&
              fs.existsSync(gitFolder) &&
              fs.lstatSync(gitFolder).isDirectory()
            );
          });

          if (containsAtLeastOneRepo) {
            this.setReposFolder(filePath);
            break;
          }
        } catch (error) {
          console.info({ error });
        }
      }
    },
    ...mapActions(appLoadingStore, [
      'setReposLoading',
      'setScanForReposLoading'
    ]),
    ...mapActions(branchesStore, [
      'updateBranches',
      'updateCurrentBranch',
      'updateDefaultBranch',
      'setDefaultBranch'
    ]),
    ...mapActions(commitLogStore, [
      'clearSelectedCommitHash'
    ]),
    ...mapActions(commitsStore, [
      'getCommits'
    ]),
    ...mapActions(fileDiffsStore, [
      'setDiffs'
    ]),
    ...mapActions(gitRemotesStore, [
      'updateRemotes'
    ]),
    ...mapActions(gitStatusStore, [
      'updateStatus'
    ])
  },
  getters: {
    ...mapState(appLoadingStore, [
      'scanForReposLoading'
    ]),
    ...mapState(gitRemotesStore, [
      'hasRemotes'
    ]),
    filteredReposList: function (state) {
      const filter = diacriticLess(state.repoFilter).toLowerCase();
      return state.reposList
        .filter((repo) => {
          const title = diacriticLess(repo.title).toLowerCase();
          return title.includes(filter);
        })
        .toSorted((a, b) => {
          return helpers.lowerCaseSort(a.title, b.title);
        });
    },
    sortedRepoPaths: function (state) {
      return state.reposList
        .map((repo) => {
          return repo.filePath;
        })
        .toSorted(helpers.lowerCaseSort);
    }
  }
});

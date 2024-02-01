import { defineStore, mapActions, mapState } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';
import { branchesStore } from '@/stores/branches.js';
import { commitsStore } from '@/stores/commits.js';
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
      reposList: [],
      potentialRepoFolders: [],
      repoFilter: '',
      currentRepo: null,
      reposFolder: null
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
      if (
        (
          !this.currentRepo ||
          !this.sortedRepoPaths.includes(this.currentRepo)
        ) &&
        this.sortedRepoPaths[0]
      ) {
        this.setCurrentRepo(this.sortedRepoPaths[0]);
      }
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
            .map((folder) => {
              const filePath = path.join(this.reposFolder, folder);
              return {
                selected: false,
                title: folder,
                filePath,
                lastCommit: null
              };
            }) || [];
        })
        .catch((error) => {
          console.log({ error });
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
          console.log({ error });
        }
      }
      this.setScanForReposLoading(false);
    },
    // This could be improved in many ways
    guessReposFolder: function () {
      if (this.reposFolder) {
        return;
      }
      const home = os.homedir();
      const desktop = path.join(home, 'Desktop');
      const documents = path.join(home, 'Documents');
      const folderNames = [
        'github',
        'repos',
        'repositories'
      ];

      // parent = home || desktop || documents
      const scanFolder = (parent) => {
        try {
          // folder = GitHub || Repos || anything
          const validMatches = fs.readdirSync(parent).filter((folder) => {
            const nameMatches = folderNames.includes(folder.toLowerCase());
            if (!nameMatches) {
              return false;
            }
            // child = C:\Users\Bob\Documents\Github || C:\Users\Bob\Repos || etc
            const child = path.join(parent, folder);
            const isFolder = fs.lstatSync(child).isDirectory();
            if (!isFolder) {
              return false;
            }
            const grandchildren = fs.readdirSync(child);
            const containsAtLeastOneRepo = grandchildren.some((grandchild) => {
              // grandchildPath = C:\Users\Bob\Repos\my-project
              const grandchildPath = path.join(child, grandchild);
              // gitFolder = C:\Users\Bob\Repos\my-project\.git
              const gitFolder = path.join(grandchildPath, '.git');
              return (
                fs.lstatSync(grandchildPath).isDirectory() &&
                fs.existsSync(gitFolder) &&
                fs.lstatSync(gitFolder).isDirectory()
              );
            });
            return containsAtLeastOneRepo;
          });
          return validMatches.map((validMatch) => {
            return path.join(parent, validMatch);
          });
        } catch (error) {
          console.log('Error when guessing reposFolder', error);
        }
      };

      const potentialReposFolders = [
        ...scanFolder(documents),
        ...scanFolder(home),
        ...scanFolder(desktop)
      ];
      this.setReposFolder(potentialReposFolders[0]);
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

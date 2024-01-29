import { defineStore, mapActions, mapState } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';
import { branchesStore } from '@/stores/branches.js';
import { commitsStore } from '@/stores/commits.js';
import { gitRemotesStore } from '@/stores/gitRemotes.js';
import { gitStatusStore } from '@/stores/gitStatus.js';

const fs = window.require('fs');
const path = window.require('path');
const os = window.require('os');

export const reposStore = defineStore('repos', {
  state: function () {
    return {
      reposList: [],
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
    setReposFolder: function (repoPath) {
      this.reposFolder = repoPath || null;
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

      const potentialRepoFolders = [
        ...scanFolder(documents),
        ...scanFolder(home),
        ...scanFolder(desktop)
      ];
      console.log({ potentialRepoFolders });
      this.setReposFolder(potentialRepoFolders[0]);
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

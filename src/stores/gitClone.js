import { defineStore } from 'pinia';

const simpleGit = require('simple-git');

export const gitCloneStore = defineStore('gitClone', {
  actions: {
    cloneRepo: async function (repoUrl, repoPath) {
      return simpleGit()
        .clone(repoUrl, repoPath)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
});

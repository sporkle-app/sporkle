const fs = nw.require('fs');
const path = nw.require('path');

export const state = {
  reposList: []
};

export const getters = {};

export const mutations = {
  /**
   * Add a new repo to the list of repos
   * @param {string}  repoPath  File path to the repo
   */
  addRepoToList: function (state, repoPath) {
    let gitDir = path.join(repoPath, '.git');
    if (
      fs.existsSync(repoPath) &&
      fs.lstatSync(repoPath).isDirectory() &&
      fs.existsSync(gitDir) &&
      fs.lstatSync(gitDir).isDirectory()
    ) {
      let repo = {
        title: path.basename(repoPath),
        filePath: repoPath
      };
      state.reposList.push(repo);
    } else {
      console.log('Error: Path is not a valid git repository.\n' + repoPath);
    }
  },
  setReposList: function (state, list) {
    console.log(list);
    list = list || [];
    state.reposList = list;
  }
};

export const actions = {
  addRepoToListAndSave: function (store, repoPath) {
    store.commit('addRepoToList', repoPath);
    store.dispatch('appSettings/saveSettings', null, { root: true });
  },
  setReposListAndSave: function (store, list) {
    store.commit('setReposList', list);
    store.dispatch('appSettings/saveSettings', null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

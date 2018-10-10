import helpers from '@/utilities/helpers.js';

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
    let repo = {
      filePath: repoPath,
      title: path.basename(repoPath)
    };
    state.reposList.push(repo);
  },
  setReposList: function (state, list) {
    list = list || [];
    state.reposList = list;
  }
};

export const actions = {
  addRepoToListAndSave: function (store, repoPath) {
    if (helpers.validateRepoPath(repoPath)) {
      store.commit('addRepoToList', repoPath);
      store.dispatch('appSettings/saveSettings', null, { root: true });
    } else {
      store.commit('setAppError', 'Path is not a valid git repository.\n' + repoPath, { root: true });
    }
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

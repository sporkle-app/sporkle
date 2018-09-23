import Vue from 'vue';
import Vuex from 'vuex';

import helpers from '@/utilities/helpers.js';

const exec = nw.require('child_process').exec;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoading: false,
    appError: '',
    branches: '',
    repoPath: 'C:\\Users\\Lenny\\Documents\\GitHub\\scout-app',
    sidebarCollapsed: false
  },
  mutations: {
    setAppError: function (state, error) {
      state.appError = error;
    },
    setAppLoading: function (state, bool) {
      state.appLoading = bool;
    },
    setBranches: function (state, branches) {
      state.branches = branches;
    },
    setRepoPath: function (state, newPath) {
      state.repoPath = newPath;
    },
    toggleSidebarCollapsed: function (state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    }
  },
  actions: {
    getBranchList: function (store) {
      store.commit('setAppLoading', true);
      helpers.setCurrentWorkingDirectory(store.state.repoPath);
      exec('git branch', function (error, stdout) {
        store.commit('setAppLoading', false);
        if (error !== null) {
          store.commit('setAppError', 'Git Error: ' + error);
        }
        store.commit('setBranches', stdout);
      });
    }
  }
});

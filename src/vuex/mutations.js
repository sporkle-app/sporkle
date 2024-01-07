
/*
  GLOBAL MUTATIONS:
  Synchronous methods for modifying the values in the state. Can be called directly.
  Their first argument is always the `state` from the store.
  Their second argument you pass in for the data to be set in the state (optional).
*/

const mutations = {
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
  setThemes: function (state, themes) {
    state.themes = themes || ['dark-mode'];
  },
  toggleSidebarCollapsed: function (state) {
    state.sidebarCollapsed = !state.sidebarCollapsed;
  }
};

export default mutations;

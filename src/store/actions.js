
import helpers from '@/utilities/helpers.js';

/*
  ACTIONS:
  These issue the order to mutate the state via commits. Use when doing Async stuff.
  They are handed a `context` from the store, and an optional `payload` object you pass in.
*/

const actions = {
  getBranchList: function (store) {
    store.commit('setAppLoading', true);
    helpers.setCurrentWorkingDirectory(store.state.repoPath);

    nw.require('child_process').exec('git branch', function (error, stdout) {
      store.commit('setAppLoading', false);
      if (error !== null) {
        store.commit('setAppError', 'Git Error: ' + error);
      }
      store.commit('setBranches', stdout);
    });
  }
};

export default actions;

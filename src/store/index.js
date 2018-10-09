import Vue from 'vue';
import Vuex from 'vuex';

import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

import appSettings from './modules/AppSettings.js';
import reposList from './modules/ReposList.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    appSettings,
    reposList
  }
});

import helpers from '@/utilities/helpers.js';

const fs = nw.require('fs');
const path = nw.require('path');

const settingsFile = path.join(nw.App.dataPath, 'settings.json');

export const state = {
  customScrollbars: false,
  theme: ''
};

export const getters = {};

export const mutations = {
  setCustomScrollbars: function (state, bool) {
    state.customScrollbars = bool;
    helpers.setHtmlTagClasses(state.theme, bool);
  },
  setTheme: function (state, theme) {
    theme = theme || 'dark-mode';
    state.theme = theme;
    helpers.setHtmlTagClasses(theme, state.customScrollbars);
  }
};

export const actions = {
  deleteSettings: function () {
    try {
      if (fs.existsSync(settingsFile)) {
        fs.unlinkSync(settingsFile);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error deleting settings file', err);
    }
  },
  loadSettings: function (store) {
    store.commit('setAppLoading', true, { root: true });

    if (fs.existsSync(settingsFile)) {
      let settings = {};

      fs.readFile(settingsFile, function (err, data) {
        if (err) {
          store.commit('setAppError', 'Unable to load settings.\n' + err, { root: true });
        }

        if (data && typeof(data) === 'string') {
          try {
            settings = JSON.parse(data);
          } catch (error) {
            store.commit('setAppError', 'Error attempting to load settings.\n' + error, { root: true });
            return;
          }
        }

        if (Object.keys(settings).length) {
          // Apply Settings
          store.commit('setCustomScrollbars', settings.customScrollbars);
          store.commit('reposList/setReposList', settings.reposList, { root: true });
          store.commit('setTheme', settings.theme);
        }

        store.commit('setAppLoading', false, { root: true });
      });
    } else {
      store.commit('setAppLoading', false, { root: true });
    }
  },
  saveSettings: function (store) {
    // Grab Settings
    let settings = {
      customScrollbars: store.state.customScrollbars,
      reposList: store.rootState.reposList.reposList,
      theme: store.state.theme
    };
    settings = JSON.stringify(settings, null, 2);
    fs.writeFile(settingsFile, settings, function (err) {
      if (err) {
        store.commit('setAppError', 'There was an error saving your settings. ' + err);
      }
    });
  },
  setCustomScrollbarsAndSave: function (store, bool) {
    store.commit('setCustomScrollbars', bool);
    store.dispatch('saveSettings');
  },
  setThemeAndSave: function (store, theme) {
    store.commit('setTheme', theme);
    store.dispatch('saveSettings');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

const fs = nw.require('fs');
const path = nw.require('path');

const settingsFile = path.join(nw.App.dataPath, 'settings.json');

export const state = {
  theme: ''
};

export const getters = {};

export const mutations = {
  setTheme: function (state, theme) {
    theme = theme || 'dark-mode';
    state.theme = theme;
    document.documentElement.className = theme;
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
    let settings = {};
    try {
      settings = String(fs.readFileSync(settingsFile));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('No settings file find, no biggie', err);
    }
    try {
      if (typeof(settings) === 'string') {
        settings = JSON.parse(settings);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error attempting to load settings', error);
    }

    settings = settings || {};
    // Apply Settings
    store.commit('setTheme', settings.theme);
    store.commit('setAppLoading', false, { root: true });
  },
  saveSettings: function (store) {
    // Grab Settings
    let settings = {
      theme: store.state.theme
    };
    settings = JSON.stringify(settings, null, 2);
    fs.writeFile(settingsFile, settings, function (err) {
      if (err) {
        store.commit('setAppError', 'There was an error saving your settings. ' + err);
      }
    });
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

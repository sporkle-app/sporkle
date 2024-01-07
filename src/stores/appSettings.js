import { defineStore } from 'pinia';

import helpers from '@/helpers/index.js';

import repos from '@/store/repos.js';

const fs = window.require('fs');
const path = window.require('path');
const settingsFile = path.join(window.nw.App.dataPath, 'settings.json');

export const appSettingsStore = defineStore('appSettings', {
  state: function () {
    return {
      customScrollbars: false,
      theme: ''
    };
  },
  actions: {
    setCustomScrollbars: function (bool) {
      this.customScrollbars = bool;
      helpers.setHtmlTagClasses(this.theme, bool);
    },
    setTheme: function (theme) {
      theme = theme || 'dark-mode';
      this.theme = theme;
      helpers.setHtmlTagClasses(theme, this.customScrollbars);
    },
    deleteSettings: function () {
      try {
        if (fs.existsSync(settingsFile)) {
          fs.unlinkSync(settingsFile);
          // eslint-disable-next-line no-console
          console.log('Successfully deleted settings');
        } else {
          // eslint-disable-next-line no-console
          console.log('Settings file did not exist');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error deleting settings file', error);
      }
    },
    loadSettings: function () {
      store.commit('setAppLoading', true, { root: true });
      let settings = {};

      if (fs.existsSync(settingsFile)) {
        fs.readFile(settingsFile, function (err, data) {
          if (err) {
            store.commit('setAppError', 'Unable to load settings.\n' + err, { root: true });
          }

          if (data) {
            try {
              settings = JSON.parse(data);
            } catch (error) {
              store.commit('setAppError', 'Error attempting to load settings.\n' + error, { root: true });
            }
          }

          this.applySettings(settings);
        });
      } else {
        this.applySettings(settings);
      }
    },
    applySettings: function (settings) {
      settings = settings || {};
      this.setCustomScrollbars(settings.customScrollbars);
      repos().setReposList(settings.reposList);
      this.setTheme(settings.theme);
      store.commit('setAppLoading', false, { root: true });
    },
    saveSettings: function (store) {
      const fs = nw.require('fs');

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

  },
  getters: {
    doubledCount: function (state) {
      return state.count * 2;
    }
  }
});

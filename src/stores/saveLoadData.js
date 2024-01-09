import { defineStore } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { reposStore } from '@/stores/repos.js';

const fs = window.require('fs');
const path = window.require('path');
const settingsFile = path.join(window.nw.App.dataPath, 'settings.json');

export const saveLoadDataStore = defineStore('saveLoadData', {
  actions: {
    applySettings: function (settings) {
      settings = settings || {};
      this.setCustomScrollbars(settings.customScrollbars);
      reposStore().setReposList(settings.reposList);
      this.setTheme(settings.theme);
      store.commit('setAppLoading', false, { root: true });
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
    saveSettings: function () {
      // Grab Settings
      let settings = {
        customScrollbars: this.customScrollbars,
        theme: this.theme,
        reposList: reposStore().reposList
      };
      settings = JSON.stringify(settings, null, 2);
      fs.writeFile(settingsFile, settings, function (error) {
        if (error) {
          alertsStore().setAppError('There was an error saving your settings. ' + error);
        }
      });
    }
  },
  getters: {
    dataToSave: function () {
      return {};
    }
  }
});

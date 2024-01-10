import { defineStore, mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { reposStore } from '@/stores/repos.js';
import { themeStore } from '@/stores/theme.js';

const fs = window.require('fs');
const path = window.require('path');
const settingsFile = path.join(window.nw.App.dataPath, 'settings.json');

export const saveLoadDataStore = defineStore('saveLoadData', {
  actions: {
    ...mapActions(alertsStore, [
      'setAppError'
    ]),
    ...mapActions(appLoadingStore, [
      'setAppLoading'
    ]),
    ...mapActions(reposStore, [
      'setReposList'
    ]),
    ...mapActions(themeStore, [
      'setCustomScrollbars',
      'setTheme'
    ]),
    applySettings: function (settings) {
      settings = settings || {};
      this.setCustomScrollbars(settings.customScrollbars);
      this.setReposList(settings.reposList);
      this.setTheme(settings.theme);
      this.setAppLoading(false);
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
      this.setAppLoading(true);

      let settings = {};

      if (fs.existsSync(settingsFile)) {
        fs.readFile(settingsFile, (err, data) => {
          if (err) {
            this.setAppError('Unable to load settings.\n' + err);
          }

          if (data) {
            try {
              settings = JSON.parse(data);
            } catch (error) {
              this.setAppError('Error attempting to load settings.\n' + error);
            }
          }

          this.applySettings(settings);
        });
      } else {
        this.applySettings(settings);
      }
    },
    saveSettings: function () {
      console.log(this.dataToSave);
      fs.writeFile(settingsFile, this.dataToSave, function (error) {
        if (error) {
          this.setAppError('There was an error saving your settings. ' + error);
        }
      });
    }
  },
  getters: {
    ...mapState(reposStore, [
      'reposList'
    ]),
    ...mapState(themeStore, [
      'customScrollbars',
      'currentTheme'
    ]),
    dataToSave: function () {
      const data = {
        customScrollbars: this.customScrollbars,
        currentTheme: this.currentTheme,
        reposList: this.reposList
      };
      return JSON.stringify(data, null, 2);
    }
  }
});

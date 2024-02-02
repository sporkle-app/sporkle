import _debounce from 'lodash-es/debounce.js';
import { defineStore, mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { reposStore } from '@/stores/repos.js';
import { themeStore } from '@/stores/theme.js';

const fs = window.require('fs');
const path = window.require('path');
const settingsFile = path.join(window.nw.App.dataPath, 'settings.json');

export const saveLoadDataStore = defineStore('saveLoadData', {
  state: function () {
    return {
      initialLoadComplete: false
    };
  },
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setSettingsLoading'
    ]),
    ...mapActions(reposStore, [
      'guessReposFolder',
      'setCurrentRepo',
      'setReposList',
      'setReposFolder'
    ]),
    ...mapActions(themeStore, [
      'setAccentHue',
      'setAccentLightness',
      'setCustomScrollbars',
      'setMinusHue',
      'setPlusHue',
      'setThemeHue',
      'setThemeInverted',
      'setZoomPercent'
    ]),
    applySettings: async function (settings) {
      settings = settings || {};
      this.setAccentHue(settings.accentHue);
      this.setAccentLightness(settings.accentLightness);
      this.setCurrentRepo(settings.currentRepo);
      this.setCustomScrollbars(settings.customScrollbars);
      this.setMinusHue(settings.minusHue);
      this.setPlusHue(settings.plusHue);
      this.setReposList(settings.reposList);
      this.setThemeHue(settings.themeHue);
      this.setThemeInverted(settings.themeInverted);
      this.setZoomPercent(settings.zoomPercent);

      this.setSettingsLoading(false);

      if (settings.reposFolder) {
        await this.setReposFolder(settings.reposFolder);
      } else {
        await this.guessReposFolder();
        await this.saveSettings();
      }
      this.initialLoadComplete = true;
    },
    deleteSettings: function () {
      try {
        if (fs.existsSync(settingsFile)) {
          fs.unlinkSync(settingsFile);
          this.setReposList();
          console.info('Successfully deleted settings');
        } else {
          console.info('Settings file did not exist');
        }
      } catch (error) {
        console.info('Error deleting settings file', error);
      }
    },
    loadSettings: async function () {
      this.setSettingsLoading(true);

      let settings = {};

      if (fs.existsSync(settingsFile)) {
        return fs.promises.readFile(settingsFile)
          .then(async (data) => {
            if (data) {
              try {
                settings = JSON.parse(data);
              } catch (error) {
                this.addErrorAlert('Error attempting to load settings.', error);
              }
            }

            await this.applySettings(settings);
          })
          .catch((error) => {
            if (error) {
              this.addErrorAlert('Unable to load settings.', error);
            }
          });
      } else {
        await this.applySettings(settings);
      }
    },
    saveSettings: _debounce(function () {
      console.info(JSON.parse(this.dataToSave));
      fs.writeFile(settingsFile, this.dataToSave, (error) => {
        if (error) {
          this.addErrorAlert('There was an error saving your settings.', error);
        }
      });
    }, 400)
  },
  getters: {
    ...mapState(reposStore, [
      'currentRepo',
      'reposFolder',
      'reposList'
    ]),
    ...mapState(themeStore, [
      'accentHue',
      'accentLightness',
      'customScrollbars',
      'plusHue',
      'minusHue',
      'themeHue',
      'themeInverted',
      'zoomPercent'
    ]),
    dataToSave: function () {
      const data = {
        accentHue: this.accentHue,
        accentLightness: this.accentLightness,
        currentRepo: this.currentRepo,
        customScrollbars: this.customScrollbars,
        minusHue: this.minusHue,
        plusHue: this.plusHue,
        reposFolder: this.reposFolder,
        reposList: this.reposList,
        themeHue: this.themeHue,
        themeInverted: this.themeInverted,
        zoomPercent: this.zoomPercent
      };
      return JSON.stringify(data, null, 2);
    }
  }
});

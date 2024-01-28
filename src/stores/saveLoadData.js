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
  actions: {
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),
    ...mapActions(appLoadingStore, [
      'setSettingsLoading'
    ]),
    ...mapActions(reposStore, [
      'setCurrentRepo',
      'setReposList'
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
    applySettings: function (settings) {
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
      this.setSettingsLoading(false);
      this.setZoomPercent(settings.zoomPercent);
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
      this.setSettingsLoading(true);

      let settings = {};

      if (fs.existsSync(settingsFile)) {
        fs.readFile(settingsFile, (err, data) => {
          if (err) {
            this.addErrorAlert('Unable to load settings.', err);
          }

          if (data) {
            try {
              settings = JSON.parse(data);
            } catch (error) {
              this.addErrorAlert('Error attempting to load settings.', error);
            }
          }

          this.applySettings(settings);
        });
      } else {
        this.applySettings(settings);
      }
    },
    saveSettings: _debounce(function () {
      console.log(this.dataToSave);
      fs.writeFile(settingsFile, this.dataToSave, function (error) {
        if (error) {
          this.addErrorAlert('There was an error saving your settings.', error);
        }
      });
    }, 400)
  },
  getters: {
    ...mapState(reposStore, [
      'currentRepo',
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
        reposList: this.reposList,
        themeHue: this.themeHue,
        themeInverted: this.themeInverted,
        zoomPercent: this.zoomPercent
      };
      return JSON.stringify(data, null, 2);
    }
  }
});

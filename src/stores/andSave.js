/**
 * @file This store exists to avoid circular dependencies.
 */

import { defineStore, mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { reposStore } from '@/stores/repos.js';
import { saveLoadDataStore } from '@/stores/saveLoadData.js';
import { themeStore } from '@/stores/theme.js';

import helpers from '@/helpers/index.js';

export const andSaveStore = defineStore('andSave', {
  actions: {
    ...mapActions(saveLoadDataStore, [
      'saveSettings'
    ]),
    ...mapActions(alertsStore, [
      'addErrorAlert'
    ]),

    // Theme
    ...mapActions(themeStore, [
      'resetSettings',
      'setAccentHue',
      'setAccentLightness',
      'setCustomScrollbars',
      'setMinusHue',
      'setPlusHue',
      'setThemeHue',
      'setThemeInverted',
      'setZoomPercent'
    ]),
    resetSettingsAndSave: function () {
      this.resetSettings();
      this.saveSettings();
    },
    setAccentHueAndSave: function (value) {
      this.setAccentHue(value);
      this.saveSettings();
    },
    setAccentLightnessAndSave: function (value) {
      this.setAccentLightness(value);
      this.saveSettings();
    },
    setCustomScrollbarsAndSave: function (bool) {
      this.setCustomScrollbars(bool);
      this.saveSettings();
    },
    setMinusHueAndSave: function (value) {
      this.setMinusHue(value);
      this.saveSettings();
    },
    setPlusHueAndSave: function (value) {
      this.setPlusHue(value);
      this.saveSettings();
    },
    setThemeHueAndSave: function (value) {
      this.setThemeHue(value);
      this.saveSettings();
    },
    setThemeInvertedAndSave: function (bool) {
      this.setThemeInverted(bool);
      this.saveSettings();
    },
    setZoomPercentAndSave: function (percent) {
      this.setZoomPercent(percent);
      this.saveSettings();
    },

    // Repo
    ...mapActions(reposStore, [
      'addRepoToList',
      'removeRepoFromList',
      'setCurrentRepo'
    ]),
    addRepoToListAndSave: function (repoPath) {
      if (helpers.validateRepoPath(repoPath)) {
        this.addRepoToList(repoPath);
        this.saveSettings();
      } else {
        this.addErrorAlert('Path is not a valid Git repository.', repoPath);
      }
    },
    removeRepoFromListAndSave: function (repoPath) {
      this.removeRepoFromList(repoPath);
      this.saveSettings();
    },
    setCurrentRepoAndSave: function (repoPath) {
      this.setCurrentRepo(repoPath);
      this.saveSettings();
    }
  }
});

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
      'setAppError'
    ]),

    // Theme
    ...mapActions(themeStore, [
      'setAccentHue',
      'setCustomScrollbars',
      'setThemeHue',
      'setThemeInverted',
      'setZoomPercent'
    ]),
    setAccentHueAndSave: function (value) {
      this.setAccentHue(value);
      this.saveSettings();
    },
    setCustomScrollbarsAndSave: function (bool) {
      this.setCustomScrollbars(bool);
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
        this.setAppError('Path is not a valid git repository.\n' + repoPath);
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

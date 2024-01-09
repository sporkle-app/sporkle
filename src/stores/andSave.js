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
      'setCustomScrollbars',
      'setTheme'
    ]),
    setCustomScrollbarsAndSave: function (bool) {
      this.setCustomScrollbars(bool);
      this.saveSettings();
    },
    setThemeAndSave: function (theme) {
      this.setTheme(theme);
      this.saveSettings();
    },

    // Repo
    ...mapActions(reposStore, [
      'addRepoToList'
    ]),
    addRepoToListAndSave: function (repoPath) {
      if (helpers.validateRepoPath(repoPath)) {
        this.addRepoToList(repoPath);
        this.saveSettings();
      } else {
        this.setAppError('Path is not a valid git repository.\n' + repoPath);
      }
    }
  }
});

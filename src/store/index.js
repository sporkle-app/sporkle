import Vue from 'vue';
import Vuex from 'vuex';

import helpers from '@/utilities/helpers.js';

const fs = nw.require('fs');
const path = nw.require('path');
const exec = nw.require('child_process').exec;

const settingsFile = path.join(nw.App.dataPath, 'settings.json');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoading: false,
    appError: '',
    branches: '',
    repoPath: 'C:\\Users\\Lenny\\Documents\\GitHub\\scout-app',
    sidebarCollapsed: false,
    theme: 'dark-mode',
    themes: [
      'dark-mode',
      'high-contrast',
      'light-mode'
    ]
  },
  mutations: {
    setAppError: function (state, error) {
      state.appError = error;
    },
    setAppLoading: function (state, bool) {
      state.appLoading = bool;
    },
    setBranches: function (state, branches) {
      state.branches = branches;
    },
    setRepoPath: function (state, newPath) {
      state.repoPath = newPath;
    },
    setTheme: function (state, theme) {
      theme = theme || 'dark-mode';
      state.theme = theme;
      document.documentElement.className = theme;
    },
    setThemes: function (state, themes) {
      state.themes = themes || ['dark-mode'];
    },
    toggleSidebarCollapsed: function (state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    }
  },
  actions: {
    getBranchList: function (store) {
      store.commit('setAppLoading', true);
      helpers.setCurrentWorkingDirectory(store.state.repoPath);
      exec('git branch', function (error, stdout) {
        store.commit('setAppLoading', false);
        if (error !== null) {
          store.commit('setAppError', 'Git Error: ' + error);
        }
        store.commit('setBranches', stdout);
      });
    },
    loadSettings: function (store) {
      store.commit('setAppLoading', true);
      fs.readFile(settingsFile, function (err, settings) {
        if (err) {
          console.log('No settings file find, no biggie', err);
        } else {
          settings = String(settings);
          try {
            settings = JSON.parse(settings);
          } catch (error) {
            console.log('Error attempting to load settings', error);
          }
          store.commit('setTheme', settings.theme);
        }
        store.commit('setAppLoading', false);
      });
    },
    saveSettings: function (store) {
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
  }
});

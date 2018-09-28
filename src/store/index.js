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
    themes: []
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
      state.theme = theme || 'dark-mode';
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
    getThemes: function (store) {
      store.commit('setAppLoading', true);
      // let appPath = nw.process.mainModule.filename;
      let themesPath = path.join('.', 'public', 'css', 'themes');
      fs.readdir(themesPath, function (err, files) {
        if (err) {
          store.dispatch('setThemeAndSave', 'dark-mode');
        } else {
          let themes = [];
          files.forEach(function (file) {
            if (file.endsWith('.css')) {
              file = file.replace('.css', '');
              let title = file.split('-');
              title = title.map(function (word) {
                // Uppercase first letter
                return word = word[0].toUpperCase() + word.slice(1, word.length);
              });
              themes.push({
                title: title.join(' '),
                file: file
              });
            }
          });
          store.commit('setThemes', themes);
        }
        store.commit('setAppLoading', false);
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

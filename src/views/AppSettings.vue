<template>
  <div class="app-settings">
    <label for="new-repo-path">
      New Repo Path
    </label>
    <input
      v-model="newRepoPath"
      id="new-repo-path"
      type="text"
      style="width: 100%"
      @keyup.enter="setNewRepoPath"
    />
    <div>
      <strong>App Loading</strong>: <pre>{{ appLoading }}</pre>
    </div>
    <div>
      <strong>Alerts</strong>: <pre>{{ alerts }}</pre>
    </div>
    <div>
      <strong>Repo Path</strong>: <pre>{{ currentRepo }}</pre>
    </div>
    <div>
      <strong>Branches</strong>: <pre>{{ branches }}</pre>
    </div>
    <div>
      <label>
        <input
          v-model="useCustomScrollbars"
          type="checkbox"
          @change="setCustomScrollbars"
        />
        <strong>Use styled scrollbars</strong>
      </label>
      <div v-if="scrollbarSettingChanged">
        Setting saved, <a href="#" @click="reloadApp">reload app</a> for setting to take effect.
      </div>
    </div>
    <div>
      <strong>Pick Theme</strong>:
      <select
        :value="currentTheme"
        @change="setTheme"
      >
        <option
          v-for="(theme, themeIndex) in themesList"
          :value="theme.file"
          :key="'theme' + themeIndex"
        >
          {{ theme.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import _startCase from 'lodash-es/startCase.js';
import { mapActions, mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { andSaveStore } from '@/stores/andSave.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { branchesStore } from '@/stores/branches.js';
import { reposStore } from '@/stores/repos.js';
import { themeStore } from '@/stores/theme.js';

import { THEMES } from '@/helpers/constants.js';

export default {
  name: 'AppSettings',
  data: function () {
    return {
      newRepoPath: nw.App.startPath,
      scrollbarSettingChanged: false,
      useCustomScrollbars: false
    };
  },
  methods: {
    reloadApp: function () {
      window.nw.Window.get().reload();
    },
    setNewRepoPath: function () {
      this.setCurrentRepoAndSave(this.newRepoPath.trim());
    },
    setCustomScrollbars: function () {
      this.scrollbarSettingChanged = true;
      this.setCustomScrollbarsAndSave(this.useCustomScrollbars);
    },
    setTheme: function ($event) {
      this.setThemeAndSave($event.target.value);
    },
    ...mapActions(andSaveStore, [
      'setCurrentRepoAndSave',
      'setCustomScrollbarsAndSave',
      'setThemeAndSave'
    ])
  },
  computed: {
    themesList: function () {
      return THEMES.map(function (file) {
        return {
          title: _startCase(file),
          file: file
        };
      });
    },
    ...mapState(alertsStore, [
      'alerts'
    ]),
    ...mapState(appLoadingStore, [
      'appLoading'
    ]),
    ...mapState(branchesStore, [
      'branches'
    ]),
    ...mapState(reposStore, [
      'currentRepo'
    ]),
    ...mapState(themeStore, [
      'currentTheme'
    ])
  },
  created: function () {
    this.useCustomScrollbars = this.customScrollbars;
  }
};
</script>

<template>
  <div class="app-settings">
    <CloseView />

    <h2>Settings</h2>

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
      <BaseCheckbox v-model="useCustomScrollbars">
        <strong>Use styled scrollbars</strong>
      </BaseCheckbox>
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

import BaseCheckbox from '@/components/BaseCheckbox.vue';
import CloseView from '@/components/CloseView.vue';

export default {
  name: 'AppSettings',
  components: {
    BaseCheckbox,
    CloseView
  },
  data: function () {
    return {
      newRepoPath: nw.App.startPath
    };
  },
  methods: {
    setNewRepoPath: function () {
      this.setCurrentRepoAndSave(this.newRepoPath.trim());
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
    useCustomScrollbars: {
      get: function () {
        return this.customScrollbars;
      },
      set: function (value) {
        this.setCustomScrollbarsAndSave(value);
      }
    },
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
      'customScrollbars',
      'currentTheme'
    ])
  }
};
</script>

<style scoped>
.app-settings {
  padding: 20px;
}
</style>

<template>
  <div class="app-settings">
    <CloseView />

    <h2>Settings</h2>

    <div>
      <BaseCheckbox v-model="useCustomScrollbars">
        <strong>Use styled scrollbars</strong>
      </BaseCheckbox>
    </div>

    <div class="theme-section">
      <p>
        Only dark theme exists, theme settings come later.
      </p>
      <label for="theme-selector">Change Theme:</label>
      <select
        id="theme-selector"
        :disabled="true"
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

import { andSaveStore } from '@/stores/andSave.js';
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
  methods: {
    setTheme: function ($event) {
      this.setThemeAndSave($event.target.value);
    },
    ...mapActions(andSaveStore, [
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
.theme-section {
  margin-top: 20px;
}
</style>

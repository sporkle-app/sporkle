import { defineStore } from 'pinia';

import { DEFAULT_THEME } from '@/helpers/constants.js';
import helpers from '@/helpers/index.js';

export const themeStore = defineStore('theme', {
  state: function () {
    return {
      customScrollbars: false,
      currentTheme: ''
    };
  },
  actions: {
    setCustomScrollbars: function (bool) {
      this.customScrollbars = bool;
    },
    setTheme: function (theme) {
      theme = theme || DEFAULT_THEME;
      this.currentTheme = theme;
    }
  }
});

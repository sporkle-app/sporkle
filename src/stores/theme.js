import { defineStore } from 'pinia';

export const themeStore = defineStore('theme', {
  state: function () {
    return {
      accentHue: 0,
      customScrollbars: false,
      themeHue: 0,
      themeInverted: false
    };
  },
  actions: {
    setAccentHue: function (value) {
      this.accentHue = value || 264;
    },
    setCustomScrollbars: function (bool) {
      this.customScrollbars = bool;
    },
    setThemeHue: function (value) {
      this.themeHue = value || 0;
    },
    setThemeInverted: function (bool) {
      this.themeInverted = bool;
    }
  }
});

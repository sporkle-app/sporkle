import { defineStore } from 'pinia';

const win = window.nw.Window.get();

export const themeStore = defineStore('theme', {
  state: function () {
    return {
      accentHue: 0,
      customScrollbars: false,
      themeHue: 0,
      themeInverted: false,
      zoomPercent: 100
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
    },
    setZoomPercent: function (percent) {
      percent = parseInt(percent);
      if (!percent || isNaN(percent)) {
        percent = 100;
      }
      this.zoomPercent = percent;
      win.zoomLevel = (Math.log(percent / 100) / Math.log(1.2));
    }
  }
});

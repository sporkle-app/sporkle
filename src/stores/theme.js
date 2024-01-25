import { defineStore } from 'pinia';

const win = window.nw.Window.get();

const DEFAULT_ACCENT_HUE = 264;
const DEFAULT_ACCENT_LIGHTNESS = 500;

export const themeStore = defineStore('theme', {
  state: function () {
    return {
      accentHue: DEFAULT_ACCENT_HUE,
      accentLightness: DEFAULT_ACCENT_LIGHTNESS,
      customScrollbars: true,
      themeHue: 0,
      themeInverted: false,
      zoomPercent: 100
    };
  },
  actions: {
    resetSettings: function () {
      this.setAccentHue();
      this.setAccentLightness();
      this.setCustomScrollbars(true);
      this.setThemeHue(0);
      this.setThemeInverted(false);
      this.setZoomPercent(100);
    },
    setAccentHue: function (value) {
      if (value === 0 || value) {
        this.accentHue = value;
      } else {
        this.accentHue = DEFAULT_ACCENT_HUE;
      }
    },
    setAccentLightness: function (value) {
      if (value === 0 || value) {
        this.accentLightness = value;
      } else {
        this.accentLightness = DEFAULT_ACCENT_LIGHTNESS;
      }
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

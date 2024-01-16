<template>
  <div class="app-settings">
    <CloseView />

    <h2>Settings</h2>

    <div>
      <BaseCheckbox v-model="useCustomScrollbars">
        <strong>Use styled scrollbars</strong>
      </BaseCheckbox>
    </div>

    <div>
      <BaseCheckbox v-model="themeIsInverted">
        <strong>Light/Dark Mode</strong>
      </BaseCheckbox>
    </div>

    <RangeSlider v-model="themeHueRange">
      <strong>App color:</strong>
    </RangeSlider>

    <RangeSlider v-model="accentHueRange">
      <strong>Accent color:</strong>
    </RangeSlider>

    <RangeSlider
      v-model="zoomPercentRange"
      min="25"
      max="300"
    >
      <strong>Zoom level:</strong>
    </RangeSlider>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';
import { themeStore } from '@/stores/theme.js';

import BaseCheckbox from '@/components/BaseCheckbox.vue';
import CloseView from '@/components/CloseView.vue';
import RangeSlider from '@/components/RangeSlider.vue';

export default {
  name: 'AppSettings',
  components: {
    BaseCheckbox,
    CloseView,
    RangeSlider
  },
  methods: {
    setTheme: function ($event) {
      this.setThemeAndSave($event.target.value);
    },
    ...mapActions(andSaveStore, [
      'setAccentHueAndSave',
      'setCustomScrollbarsAndSave',
      'setThemeHueAndSave',
      'setThemeInvertedAndSave',
      'setZoomPercentAndSave'
    ])
  },
  computed: {
    accentHueRange: {
      get: function () {
        return this.accentHue;
      },
      set: function (value) {
        this.setAccentHueAndSave(value);
      }
    },
    themeHueRange: {
      get: function () {
        return this.themeHue;
      },
      set: function (value) {
        this.setThemeHueAndSave(value);
      }
    },
    themeIsInverted: {
      get: function () {
        return this.themeInverted;
      },
      set: function (bool) {
        this.setThemeInvertedAndSave(bool);
      }
    },
    useCustomScrollbars: {
      get: function () {
        return this.customScrollbars;
      },
      set: function (bool) {
        this.setCustomScrollbarsAndSave(bool);
      }
    },
    zoomPercentRange: {
      get: function () {
        return this.zoomPercent;
      },
      set: function (percent) {
        this.setZoomPercentAndSave(percent);
      }
    },
    ...mapState(themeStore, [
      'accentHue',
      'customScrollbars',
      'themeHue',
      'themeInverted',
      'zoomPercent'
    ])
  }
};
</script>

<style scoped>
.app-settings {
  height: calc(100vh - var(--timeline-height));
  padding: 20px;
  overflow: auto;
}
input[type="range"] {
  display: block;
}
</style>

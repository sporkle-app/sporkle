<template>
  <ViewWrapper title="Settings">
    <button
      v-if="!resetConfirmationVisible"
      class="confirm-reset-button"
      @click="resetConfirmationVisible = true"
    >
      Reset all settings to defaults
    </button>

    <template v-if="resetConfirmationVisible">
      <p>Are you sure? The below settings will be reset.</p>
      <button
        class="reset-button"
        @click="confirmReset"
      >Yes, reset</button>
      <button
        class="cancel-reset-button"
        @click="resetConfirmationVisible = false"
      >No, don't reset</button>
    </template>

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
  </ViewWrapper>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';
import { themeStore } from '@/stores/theme.js';

import BaseCheckbox from '@/components/BaseCheckbox.vue';
import RangeSlider from '@/components/RangeSlider.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';

export default {
  name: 'AppSettings',
  components: {
    BaseCheckbox,
    RangeSlider,
    ViewWrapper
  },
  data: function () {
    return {
      resetConfirmationVisible: false
    };
  },
  methods: {
    confirmReset: function () {
      this.resetConfirmationVisible = false;
      this.resetSettingsAndSave();
    },
    setTheme: function ($event) {
      this.setThemeAndSave($event.target.value);
    },
    ...mapActions(andSaveStore, [
      'resetSettingsAndSave',
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
.confirm-reset-button {
  margin-bottom: 10px;
}
.reset-button {
  margin: 0px 10px 20px 0px;
}
.cancel-reset-button {
  margin: 0px 0px 20px 0px;
}
input[type="range"] {
  display: block;
}
</style>

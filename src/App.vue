<template>
  <div
    class="app-container"
    :class="{
      'custom-scrollbars': customScrollbars,
      loading: appLoading
    }"
    :style="appWideCustomProperties"
  >
    <SideBar />
    <main
      class="main-container"
      :class="{ 'sidebar-hidden': sidebarCollapsed }"
    >
      <TopPanel />
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <Component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
    <GlobalAlerts />
  </div>
  <div v-show="appLoading" class="spinner-container">
    <img
      alt="Sporkle! Logo"
      class="logo"
      src="/logo.svg"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';
import { reposStore } from '@/stores/repos.js';
import { saveLoadDataStore } from '@/stores/saveLoadData.js';
import { sidebarStore } from '@/stores/sidebar.js';
import { themeStore } from '@/stores/theme.js';

import BaseIcon from '@/components/BaseIcon.vue';
import GlobalAlerts from '@/components/alerts/GlobalAlerts.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import TopPanel from '@/components/toppanel/TopPanel.vue';

const fs = window.require('fs');

export default {
  name: 'App',
  components: {
    BaseIcon,
    GlobalAlerts,
    SideBar,
    TopPanel
  },
  methods: {
    ...mapActions(saveLoadDataStore, [
      'loadSettings'
    ])
  },
  computed: {
    appWideCustomProperties: function () {
      const aliases = [
        '--bg: var(--primary)',
        '--link: var(--accent)',
        '--popout: var(--muted-accent)'
      ];
      const customProperties = [
        ...aliases
      ];
      const accentHue = this.accentHue;
      const plusHue = this.plusHue;
      const minusHue = this.minusHue;
      const lightnessAccent = (this.accentLightness + 127) / 10;
      const lightnesMutedAccent = (this.accentLightness / 10);
      customProperties.push('--accent: hsl(' + accentHue + ', 100%, ' + lightnessAccent + '%)');
      customProperties.push('--muted-accent: hsl(' + accentHue + ', 24.7%, ' + lightnesMutedAccent + '%)');
      customProperties.push('--diff-plus: hsl(' + plusHue + 'deg, 14.1%, 30.59%)');
      customProperties.push('--diff-minus: hsl(' + minusHue + 'deg, 14.1%, 30.59%)');
      return customProperties.join(';');
    },
    styleFilters: function () {
      let filters = [];
      if (this.themeInverted) {
        filters.push('invert(1)');
      }
      if (this.themeHue) {
        filters.push('hue-rotate(' + this.themeHue + 'deg)');
      }
      return filters.join(' ');
    },
    ...mapState(appLoadingStore, [
      'appLoading'
    ]),
    ...mapState(reposStore, [
      'currentRepo',
      'reposList'
    ]),
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ]),
    ...mapState(themeStore, [
      'accentHue',
      'accentLightness',
      'customScrollbars',
      'minusHue',
      'plusHue',
      'themeHue',
      'themeInverted'
    ])
  },
  created: async function () {
    await this.loadSettings();
    if (!this.reposList.length) {
      this.$router.push({ name: 'scanForRepos' });
    }
    if (
      this.currentRepo &&
      !fs.existsSync(this.currentRepo)
    ) {
      this.$router.push({ name: 'missingRepo' });
    }
  }
};
</script>

<style>
.app-container {
  display: flex;
  width:  100%;
  height: 100vh;
  background: var(--bg);
  filter: v-bind(styleFilters);
}
.main-container {
  width: 100%;
  margin-left: var(--sidebar-width);
  transition: var(--sidebar-transition) ease margin-left;
}
.sidebar-hidden {
  margin-left: 0px;
}
.loading {
  opacity: 0.5;
}
.spinner-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overlay: hidden;
  z-index: 800;
}
</style>

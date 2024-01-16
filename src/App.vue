<template>
  <div
    class="app-container"
    :class="{
      'custom-scrollbars': customScrollbars,
      loading: appLoading
    }"
  >
    <SideBar />
    <main
      class="main-container"
      :class="{ 'sidebar-hidden': sidebarCollapsed }"
    >
      <TimeLinePanel />
      <RouterView />
    </main>
    <GlobalAlerts />
    <div v-show="appLoading" class="spinner-container">
      <BaseIcon
        name="RiLoader5Fill"
        animation="spin"
        scale="3"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';
import { saveLoadDataStore } from '@/stores/saveLoadData.js';
import { sidebarStore } from '@/stores/sidebar.js';
import { themeStore } from '@/stores/theme.js';

import BaseIcon from '@/components/BaseIcon.vue';
import GlobalAlerts from '@/components/GlobalAlerts.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import TimeLinePanel from '@/components/timeline/TimeLinePanel.vue';

export default {
  name: 'App',
  components: {
    BaseIcon,
    GlobalAlerts,
    SideBar,
    TimeLinePanel
  },
  methods: {
    ...mapActions(saveLoadDataStore, [
      'loadSettings'
    ])
  },
  computed: {
    ...mapState(themeStore, [
      'customScrollbars'
    ]),
    ...mapState(appLoadingStore, [
      'appLoading'
    ]),
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  },
  created: function () {
    this.loadSettings();
  }
};
</script>

<style>
.app-container {
  display: flex;
  width:  100%;
  height: 100vh;
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
  z-index: 999;
}
</style>

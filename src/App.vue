<template>
  <div class="app-container">
    <SideBar />
    <main
      class="main-container"
      :class="{ 'sidebar-hidden': sidebarCollapsed }"
    >
      <TimeLine />
      <RouterView />
    </main>
    <GlobalAlerts />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { saveLoadDataStore } from '@/stores/saveLoadData.js';
import { sidebarStore } from '@/stores/sidebar.js';

import GlobalAlerts from '@/components/GlobalAlerts.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import TimeLine from '@/components/timeline/TimeLine.vue';

export default {
  name: 'App',
  components: {
    GlobalAlerts,
    SideBar,
    TimeLine
  },
  methods: {
    ...mapActions(saveLoadDataStore, [
      'loadSettings'
    ])
  },
  computed: {
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
</style>

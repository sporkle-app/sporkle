<template>
  <div class="container-fluid d-flex flex-column g-0 vh-100">
    <TopNav />
    <div class="container-fluid g-0 d-flex h-100">
      <SideBar />
      <RouterView
        class="container-fluid mt-3"
        :key="$route.fullPath"
      />
    </div>
  </div>
</template>

<script>
import { settingsStore } from '@/stores/appSettings.js';

import SideBar from '@/components/layout/SideBar.vue';
import TopNav from '@/components/layout/TopNav.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    TopNav
  },
  methods: {
    setAppName: function () {
      document.querySelector('head title').innerText = this.appConfig.appName;
    }
  },
  created: function () {
    this.setAppName();
    settingsStore().loadSettings();
  }
};
</script>

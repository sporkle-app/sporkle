<template>
  <div class="app-container">
    <SideBar />
    <main>
      <TimeLine />
      <RouterView />
    </main>
    <GlobalAlerts />
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { saveLoadDataStore } from '@/stores/saveLoadData.js';

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
main {
  width: 100%;
}
</style>

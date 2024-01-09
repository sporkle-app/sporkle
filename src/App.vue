<template>
  <div id="app" class="app-container">
    <SideBar />
    <main>
      <TimeLine />
      <RouterView />
    </main>
    <GlobalAlerts />
  </div>
</template>

<script>
import GlobalAlerts from '@/components/GlobalAlerts.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import TimeLine from '@/components/timeline/TimeLine.vue';

export default {
  name: 'App',
  components: {
    GlobalAlerts,
    SideBar,
    TimeLine
  }
};
</script>

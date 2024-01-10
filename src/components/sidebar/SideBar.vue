<template>
  <div
    :class="{ 'collapse': sidebarCollapsed }"
    class="sidebar"
  >
    <SideBarControls />
    <ReposList />
    <ReposListControls />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { sidebarStore } from '@/stores/sidebar.js';

import ReposList from '@/components/sidebar/ReposList.vue';
import ReposListControls from '@/components/sidebar/ReposListControls.vue';
import SideBarControls from '@/components/sidebar/SideBarControls.vue';

export default {
  name: 'SideBar',
  components: {
    ReposList,
    ReposListControls,
    SideBarControls
  },
  computed: {
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  }
};
</script>

<style>
.sidebar {
  border: 1px solid #000;
}
</style>

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

<style scoped>
.sidebar {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100vh;
  background: #0004;
  overflow: auto;
  transition: var(--sidebar-transition) ease left;
}
.sidebar.collapse {
  left: calc(-1 * var(--sidebar-width));
}
</style>

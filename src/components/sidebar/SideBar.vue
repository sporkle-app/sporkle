<template>
  <div
    :class="{ 'collapse': sidebarCollapsed }"
    class="sidebar"
  >
    <SideBarControls />
    <ReposList />
    <SideBarFooter />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { sidebarStore } from '@/stores/sidebar.js';

import ReposList from '@/components/sidebar/ReposList.vue';
import SideBarControls from '@/components/sidebar/SideBarControls.vue';
import SideBarFooter from '@/components/sidebar/SideBarFooter.vue';

export default {
  name: 'SideBar',
  components: {
    ReposList,
    SideBarControls,
    SideBarFooter
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

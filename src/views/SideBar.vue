<template>
  <div :class="sidebarCollapsed ? 'collapse' : ''" class="sidebar">
    <side-bar-controls />
    <repos-list />
    <repos-list-controls />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SideBarControls from '@/components/sidebar/SideBarControls.vue';
import ReposList from '@/components/sidebar/ReposList.vue';
import ReposListControls from '@/components/sidebar/ReposListControls.vue';

export default {
  name: 'SideBar',
  components: {
    'side-bar-controls': SideBarControls,
    'repos-list': ReposList,
    'repos-list-controls': ReposListControls
  },
  computed: {
    ...mapState([
      'sidebarCollapsed'
    ])
  }
};
</script>

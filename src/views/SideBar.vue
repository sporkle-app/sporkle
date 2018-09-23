<template>
  <div :class="sidebarCollapsed ? 'collapse' : ''" class="sidebar">
    Sidebar
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SideBar',
  computed: {
    ...mapState([
      'sidebarCollapsed'
    ])
  }
};
</script>

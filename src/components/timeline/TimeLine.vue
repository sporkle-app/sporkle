<template>
  <div class="timeline">
    <button @click="toggleSidebar">
      <template v-if="sidebarCollapsed">➡</template>
      <template v-else>⬅</template>
    </button>
    Timeline
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { sidebarStore } from '@/stores/sidebar.js';

export default {
  name: 'TimeLine',
  methods: {
    ...mapActions(sidebarStore, [
      'toggleSidebarCollapsed'
    ])
  },
  computed: {
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  }
};
</script>

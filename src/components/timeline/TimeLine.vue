<template>
  <div class="timeline">
    <button @click="toggleSidebarCollapsed">
      <VIcon
        v-if="sidebarCollapsed"
        name="ri-layout-column-line"
      />
      <VIcon
        v-else
        name="ri-layout-column-fill"
      />
    </button>
    <strong>Branches:</strong> {{ branches }}
    <div>
      Timeline
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { branchesStore } from '@/stores/branches.js';
import { sidebarStore } from '@/stores/sidebar.js';

export default {
  name: 'TimeLine',
  methods: {
    ...mapActions(sidebarStore, [
      'toggleSidebarCollapsed'
    ])
  },
  computed: {
    ...mapState(branchesStore, [
      'branches'
    ]),
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  }
};
</script>

<style scoped>
.timeline {
  height: var(--timeline-height);
  background: #2229;
}
</style>

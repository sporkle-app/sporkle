<template>
  <div class="timeline">
    <button @click="toggleSidebarCollapsed">
      <template v-if="sidebarCollapsed">➡</template>
      <template v-else>⬅</template>
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

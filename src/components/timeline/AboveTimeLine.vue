<template>
  <div class="above-timeline">
    <div>
      <button
        :title="sidebarCollapsed ? 'Show sidebar' : 'Hide Sidebar'"
        @click="toggleSidebarCollapsed"
      >
      </button>
      <button
        title="Create branch"
      >
      </button>
      <button>
        Update from main
      </button>
    </div>
    <div>
      <button
        v-if="hasUnsyncedCommits"
      >
        Undo Last Commit
      </button>
      <button
        title="Sync up with the remote, pulling latest and pushing up"
      >
        Sync
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { commitsStore } from '@/stores/commits.js';
import { sidebarStore } from '@/stores/sidebar.js';

export default {
  name: 'AboveTimeLine',
  methods: {
    ...mapActions(sidebarStore, [
      'toggleSidebarCollapsed'
    ])
  },
  computed: {
    hasUnsyncedCommits: function () {
      return this.unsyncedCommits.length;
    },
    ...mapState(commitsStore, [
      'unsyncedCommits'
    ]),
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  }
};
</script>

<style scoped>
.above-timeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button {
  margin-right: 5px;
}
button:last-of-type {
  margin-right: 0px;
}
</style>

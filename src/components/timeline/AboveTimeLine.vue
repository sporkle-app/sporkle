<template>
  <div
    class="above-timeline"
    :class="{ 'sidebar-hidden': sidebarCollapsed }"
  >
    <div>
      <button
        class="sidebar-toggle-button"
        :title="sidebarCollapsed ? 'Show sidebar' : 'Hide Sidebar'"
        @click="toggleSidebarCollapsed"
      >
        <BaseIcon
          v-if="sidebarCollapsed"
          name="RiLayoutColumnLine"
        />
        <BaseIcon
          v-else
          name="RiLayoutColumnFill"
        />
      </button>
      <div class="sidebar-toggle-placeholder"></div>
      <CreateBranchPopout />
      <button>
        <BaseIcon name="RiGitMergeLine" />
        Update from main
      </button>
    </div>
    <div class="right">
      <button
        v-if="hasUnsyncedCommits"
      >
        <BaseIcon name="RiArrowGoBackLine" />
        Undo Last Commit
      </button>
      <button
        title="Sync up with the remote, pulling latest and pushing up"
      >
        <BaseIcon name="RiLoopRightLine" />
        Sync
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { commitsStore } from '@/stores/commits.js';
import { sidebarStore } from '@/stores/sidebar.js';

import BaseIcon from '@/components/BaseIcon.vue';
import CreateBranchPopout from '@/components/timeline/CreateBranchPopout.vue';

export default {
  name: 'AboveTimeLine',
  components: {
    BaseIcon,
    CreateBranchPopout
  },
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
.right {
  height: var(--top-button-height);
}
.sidebar-toggle-button {
  position: absolute;
  top: 0px;
  left: calc(var(--sidebar-width) - var(--top-button-height));
  width: var(--top-button-height);
  height: var(--top-button-height);
  margin: 0px;
  transition: var(--sidebar-transition) ease all, 0s ease border;
  z-index: 9;
}
.sidebar-toggle-placeholder {
  display: inline-block;
  width: 0px;
  height: var(--top-button-height);
  background: var(--button);
  border: 0px;
  padding: 0px;
  transition: var(--sidebar-transition) ease all;
  vertical-align: top;
}
.sidebar-hidden .sidebar-toggle-button {
  left: 0px;
}
.sidebar-hidden .sidebar-toggle-placeholder {
  width: var(--top-button-height);
  margin-right: 5px;
}
button {
  height: var(--top-button-height);
  margin-right: 5px;
}
button:last-of-type {
  margin-right: 0px;
}
</style>

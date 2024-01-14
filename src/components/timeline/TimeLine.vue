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
      <svg width=100 height=100 style='overflow: visible;'>
        <path d='M100,20 L705,20'
          fill='none' stroke='white' stroke-width=5 transform='translate(50,0)' />
        <path d='M100,20 Q130,20 160,45 T685,60'
          fill='none' stroke='white' stroke-width=5 transform='translate(50,0)' />
          M10 80 Q 77.5 10, 145 80 T 280 80
        <circle
          cx="520"
          cy="20"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />

        <circle
          cx="300"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="340"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="380"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="420"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="460"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="500"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="540"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="580"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="620"
          cy="60"
          r="6"
          stroke-width="6"
          fill="#FFFFFF"
          stroke="white"
        />
        <circle
          cx="660"
          cy="60"
          r="8"
          stroke-width="4"
          stroke="white"
        />
        <circle
          cx="700"
          cy="60"
          r="8"
          stroke-width="4"
          stroke="white"
        />

        <circle
          cx="740"
          cy="60"
          r="12"
          stroke-width="4"
          stroke-dasharray="15 4"
          stroke="white"
        />
      </svg>
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

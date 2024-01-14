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
        <circle v-for="(circle, index) in commitDataPoints" :key="index"
          :cx="circle.x"
          :cy="circle.y"
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
  data: function() {
    return {
      commitDataPoints: [
        {
          x: 520,
          y: 20
        },
        {
          x: 300,
          y: 60
        },
        {
          x: 340,
          y: 60
        },
        {
          "x": 380,
          "y": 60
        },
        {
          "x": 420,
          "y": 60
        },
        {
          "x": 460,
          "y": 60
        },
        {
          "x": 500,
          "y": 60
        },
        {
          "x": 540,
          "y": 60
        },
        {
          "x": 580,
          "y": 60
        },
        {
          "x": 620,
          "y": 60
        },
        {
          "x": 660,
          "y": 60
        },
      ]
    }
  },
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

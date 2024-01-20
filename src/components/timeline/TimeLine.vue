<template>
  <div class="timeline">
    <div class="branch-dropdowns" style="width:20%;">
      <select id="selectOption" name="options">
        <option
          v-for="branch in branchNames"
          :value="branch"
          :key="branch"
        >
          {{ branch }}
        </option>
      </select>

      <select id="selectOption" name="options">
        <option
          v-for="branch in branchNames"
          :value="branch"
          :key="branch"
        >
          {{ branch }}
        </option>
      </select>
    </div>
  
    <svg width="100" height="100" style="overflow: visible;">
      <path
        d="M100,20 L705,20"
        fill="none"
        stroke="white"
        stroke-width="5"
        transform="translate(50,0)"
      />
      <path
        d="M100,20 Q130,20 160,45 T685,60"
        fill="none"
        stroke="white"
        stroke-width="5"
        transform="translate(50,0)"
      />
      <circle
        v-for="(circle, index) in commitDataPoints"
        :cx="circle.x"
        :cy="circle.y"
        r="6"
        stroke-width="6"
        fill="#FFFFFF"
        stroke="white"
        :key="index"
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
</template>

<script>
import { mapState } from 'pinia';

import { branchesStore } from '@/stores/branches.js';

export default {
  name: 'TimeLine',
  data: function () {
    return {
      selectedBranch: '',
      commitDataPoints: [
        { x: 520, y: 20 },
        { x: 300, y: 60 },
        { x: 340, y: 60 },
        { x: 380, y: 60 },
        { x: 420, y: 60 },
        { x: 460, y: 60 },
        { x: 500, y: 60 },
        { x: 540, y: 60 },
        { x: 580, y: 60 },
        { x: 620, y: 60 },
        { x: 660, y: 60 }
      ]
    };
  },
  computed: {
    ...mapState(branchesStore, [
      'branchNames'
    ])
  }
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: row;
}
.branch-dropdowns {
  display: flex;
  flex-direction: column;
}
</style>

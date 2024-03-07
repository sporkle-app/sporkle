<template>
  <div class="timeline">
    <BranchPicker />

    <svg width="100" height="100" style="overflow: visible;">
      <path
        d="M150,20 L750,20"
        fill="none"
        stroke="#FFF"
        stroke-width="5"
      />
      <path
        d="M252,60 L750,60"
        fill="none"
        stroke="#FFF"
        stroke-width="5"
      />
      <path
        d="M150,60 L250,60"
        fill="none"
        stroke="#FFF3"
        stroke-width="5"
      />
      <path
        d="M170,20c42,0,27,40,82,40"
        fill="none"
        stroke="white"
        stroke-width="5"
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
import BranchPicker from '@/components/toppanel/BranchPicker.vue';

export default {
  name: 'TimeLine',
  components: {
    BranchPicker
  },
  data: function () {
    return {
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
  }
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: row;
}
</style>

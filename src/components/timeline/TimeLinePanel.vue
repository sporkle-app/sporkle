<template>
  <div class="timeline-panel">
    <AboveTimeLine />

    <div>
      <strong>Branches:</strong>
      {{ branches }}
    </div>

    <TimeLine />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { branchesStore } from '@/stores/branches.js';

import AboveTimeLine from '@/components/timeline/AboveTimeLine.vue';
import TimeLine from '@/components/timeline/TimeLine.vue';

export default {
  name: 'TimeLinePanel',
  components: {
    AboveTimeLine,
    TimeLine
  },
  computed: {
    ...mapState(branchesStore, [
      'branches'
    ])
  }
};
</script>

<style scoped>
.timeline-panel {
  height: var(--timeline-height);
  background: #2229;
}
</style>

<template>
  <div class="timeline-panel">
    <AboveTimeLine />
    <TimeLine />
  </div>
</template>

<script>
import AboveTimeLine from '@/components/timeline/AboveTimeLine.vue';
import TimeLine from '@/components/timeline/TimeLine.vue';

export default {
  name: 'TimeLinePanel',
  components: {
    AboveTimeLine,
    TimeLine
  }
};
</script>

<style scoped>
.timeline-panel {
  height: var(--timeline-height);
  background: var(--dark60);
}
</style>

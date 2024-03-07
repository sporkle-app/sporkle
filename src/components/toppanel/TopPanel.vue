<template>
  <div class="top-panel">
    <AboveTimeLine />
    <TimeLine />
  </div>
</template>

<script>
import AboveTimeLine from '@/components/toppanel/AboveTimeLine.vue';
import TimeLine from '@/components/toppanel/TimeLine.vue';

export default {
  name: 'TimeLinePanel',
  components: {
    AboveTimeLine,
    TimeLine
  }
};
</script>

<style scoped>
.top-panel {
  height: var(--top-panel-height);
  background: var(--dark60);
}
</style>

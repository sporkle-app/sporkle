<template>
  <div class="timeline">
    <BranchPicker />
    Time line
  </div>
</template>

<script>
import BranchPicker from '@/components/toppanel/BranchPicker.vue';

export default {
  name: 'TimeLine',
  components: {
    BranchPicker
  }
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: row;
}
</style>

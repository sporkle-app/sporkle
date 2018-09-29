<template>
  <div class="commitlog">
    Commit Log.
    <app-settings />
  </div>
</template>

<script>
import AppSettings from '@/views/AppSettings.vue';

export default {
  name: 'CommitLog',
  components: {
    'app-settings': AppSettings
  }
};
</script>

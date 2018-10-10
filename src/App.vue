<template>
  <div id="app" class="app-container">
    <side-bar />
    <main>
      <time-line />
      <div class="commit-diff-container">
        <commit-log />
        <file-diff />
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from '@/views/SideBar.vue';
import TimeLine from '@/views/TimeLine.vue';
import CommitLog from '@/views/CommitLog.vue';
import FileDiff from '@/views/FileDiff.vue';

export default {
  name: 'App',
  components: {
    'side-bar': SideBar,
    'time-line': TimeLine,
    'commit-log': CommitLog,
    'file-diff': FileDiff
  }
};
</script>

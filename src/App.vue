<template>
  <div id="app" class="app-container">
    <side-bar />
    <time-line />
    <commit-log />
    <file-diff />
  </div>
</template>

<script>
import SideBar from '@/views/SideBar.vue';
import TimeLine from '@/views/TimeLine.vue';
import CommitLog from '@/views/CommitLog.vue';
import FileDiff from '@/views/FileDiff.vue';

export default {
  name: 'Home',
  components: {
    'side-bar': SideBar,
    'time-line': TimeLine,
    'commit-log': CommitLog,
    'file-diff': FileDiff
  }
};
</script>

<style lang="sass">
@import 'sass/style.sass'
</style>

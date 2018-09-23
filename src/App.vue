<template>
  <div id="app" class="app-container">
    <side-bar></side-bar>
    <main>
      <time-line></time-line>
      <div class="commit-diff-container">
        <commit-log></commit-log>
        <file-diff></file-diff>
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

<template>
  <div id="app" class="app-container">
    <link :href="'css/themes/' + theme + '.css'" rel="stylesheet" />
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
import { mapState } from 'vuex';

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
  },
  computed: {
    ...mapState([
      'theme'
    ])
  }
};
</script>

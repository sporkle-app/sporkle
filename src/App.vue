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
    <base-alert v-if="appError" :message="appError" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SideBar from '@/views/SideBar.vue';
import TimeLine from '@/views/TimeLine.vue';
import CommitLog from '@/views/CommitLog.vue';
import FileDiff from '@/views/FileDiff.vue';
import BaseAlert from '@/utilities/BaseAlert.vue';

export default {
  name: 'App',
  components: {
    'side-bar': SideBar,
    'time-line': TimeLine,
    'commit-log': CommitLog,
    'file-diff': FileDiff,
    'base-alert': BaseAlert
  },
  computed: {
    ...mapState([
      'appError'
    ])
  }
};
</script>

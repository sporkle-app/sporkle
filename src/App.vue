<template>
  <div id="app" class="app-container">
    <SideBar />
    <main>
      <TimeLine />
      <div class="commit-diff-container">
        <CommitLog />
        <FileDiff />
      </div>
    </main>
    <BaseAlert v-if="appError" :message="appError" />
  </div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue';
import CommitLog from '@/components/commitlog/CommitLog.vue';
import FileDiff from '@/components/filediff/FileDiff.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import TimeLine from '@/components/timeline/TimeLine.vue';

export default {
  name: 'App',
  components: {
    BaseAlert,
    CommitLog,
    FileDiff,
    SideBar,
    TimeLine
  }
};
</script>

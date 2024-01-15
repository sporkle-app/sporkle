<template>
  <div
    class="file-diff"
    :class="{
      animate: animateTransition,
      'commit-log-collapsed': commitLogCollapsed,
      'sidebar-collapsed': sidebarCollapsed
    }"
  >
    <button
      :title="(commitLogCollapsed ? 'Show' : 'Hide') + ' Commit Lifecycle Panel'"
      @click="toggleCommitLogCollapsed"
    >
      <BaseIcon
        v-if="commitLogCollapsed"
        name="RiLayoutColumnLine"
      />
      <BaseIcon
        v-else
        name="RiLayoutColumnFill"
      />
    </button>
    <OneFile
      v-for="(file, fileIndex) in files"
      :file="file"
      :key="'file' + fileIndex"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { commitLogStore } from '@/stores/commitLog.js';
import { sidebarStore } from '@/stores/sidebar.js';

import BaseIcon from '@/components/BaseIcon.vue';
import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'FileDiff',
  components: {
    BaseIcon,
    OneFile
  },
  data: function () {
    return {
      animateTransition: false,
      files: [
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame' },
        { path: 'C:\\Folder' },
        { path: 'C:\\Users\\Bob\\GitHub\\Reponame\\asdf\\qwer\\dfg\\rttryuqrewvca\\qwer\\asdfqwerfzxv\\qwer\\asvasvr\\ascaweawe\\cwacawsdca\\acwecawecasd\\qweqc\\sdfvs' }
      ]
    };
  },
  methods: {
    ...mapActions(commitLogStore, [
      'toggleCommitLogCollapsed'
    ])
  },
  computed: {
    ...mapState(commitLogStore, [
      'commitLogCollapsed'
    ]),
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  },
  watch: {
    // This is so we get smooth animations when toggling the sidebar/commitlog, but not when maximizing/restoring the window
    commitLogCollapsed: function () {
      this.animateTransition = true;
      setTimeout(() => {
        this.animateTransition = false;
      }, 750);
    },
    sidebarCollapsed: function () {
      this.animateTransition = true;
      setTimeout(() => {
        this.animateTransition = false;
      }, 750);
    }
  }
};
</script>

<style scoped>
.file-diff {
  width: calc(100vw - var(--commit-log-width) - var(--sidebar-width));
  height: calc(100vh - var(--timeline-height));
  overflow: auto;
}
.file-diff.animate {
  transition: var(--sidebar-transition) ease width;
}
.file-diff.sidebar-collapsed {
  width: calc(100vw - var(--commit-log-width));
}
.file-diff.commit-log-collapsed {
  width: calc(100vw - var(--sidebar-width));
}
.file-diff.sidebar-collapsed.commit-log-collapsed {
  width: calc(100vw);
}
</style>

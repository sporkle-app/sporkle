<template>
  <div
    class="file-diff"
    :class="{ wide: sidebarCollapsed }"
  >
    <OneFile
      v-for="(file, fileIndex) in files"
      :file="file"
      :key="'file' + fileIndex"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { sidebarStore } from '@/stores/sidebar.js';

import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'FileDiff',
  components: {
    OneFile
  },
  data: function () {
    return {
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
  computed: {
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  }
};
</script>

<style scoped>
.file-diff {
  width: calc(100vw - var(--commit-log-width) - var(--sidebar-width));
  height: calc(100vh - var(--timeline-height));
  overflow: auto;
  transition: var(--sidebar-transition) ease width;
}
.file-diff.wide {
  width: calc(100vw - var(--commit-log-width));
}
</style>

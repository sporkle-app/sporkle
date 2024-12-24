<template>
  <div
    class="file-diff"
    :class="{
      animate: animateTransition,
      'commit-log-collapsed': commitLogCollapsed,
      'sidebar-collapsed': sidebarCollapsed
    }"
  >
    <div>
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

      <span :title="'Hash: ' + (selectedCommit?.hash || '') + '\nMessage: ' + (selectedCommit?.body || '')">
        {{ selectedCommit?.subject }}
      </span>
      <span>
        {{ selectedCommit?.author?.name }}
      </span>
      ({{ diffs.length }} file{{ diffs.length !== 1 ? 's' : '' }})
      <pre>
        {{ JSON.stringify(selectedCommit, null, 2) }}
      </pre>
      <DiffTotals
        :files="selectedCommit?.stats"
        insert="additions"
        removal="deletions"
      />
    </div>
    <OneFile
      v-for="(file, fileIndex) in diffs"
      :file="file"
      :key="'file' + fileIndex"
    />
    <div class="spacer"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { commitLogStore } from '@/stores/commitLog.js';
import { fileDiffsStore } from '@/stores/fileDiffs.js';
import { reposStore } from '@/stores/repos.js';
import { sidebarStore } from '@/stores/sidebar.js';

import BaseIcon from '@/components/BaseIcon.vue';
import DiffTotals from '@/components/filediff/DiffTotals.vue';
import OneFile from '@/components/filediff/OneFile.vue';

export default {
  name: 'FileDiff',
  components: {
    BaseIcon,
    DiffTotals,
    OneFile
  },
  data: function () {
    return {
      animateTransition: false
    };
  },
  methods: {
    ...mapActions(commitLogStore, [
      'toggleCommitLogCollapsed'
    ])
  },
  computed: {
    ...mapState(commitLogStore, [
      'commitLogCollapsed',
      'selectedCommit'
    ]),
    ...mapState(fileDiffsStore, [
      'diffs'
    ]),
    ...mapState(reposStore, [
      'currentRepo'
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
  height: calc(100vh - var(--top-panel-height));
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
.spacer {
  height: 33px;
}
</style>

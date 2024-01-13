<template>
  <div class="commit-diff-container">
    <BaseAccordion
      direction="left"
      :show="!commitLogCollapsed"
    >
      <CommitLog />
    </BaseAccordion>
    <FileDiff />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { commitLogStore } from '@/stores/commitLog.js';

import BaseAccordion from '@/components/BaseAccordion.vue';
import CommitLog from '@/components/commitlog/CommitLog.vue';
import FileDiff from '@/components/filediff/FileDiff.vue';

export default {
  name: 'CommitDiffContainer',
  components: {
    BaseAccordion,
    CommitLog,
    FileDiff
  },
  computed: {
    ...mapState(commitLogStore, [
      'commitLogCollapsed'
    ])
  }
};
</script>

<style>
.commit-diff-container {
  display: flex;
}
</style>

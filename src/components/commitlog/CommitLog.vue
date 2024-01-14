<template>
  <div class="commit-log">
    <CreateCommitForm
      :files="uncommitedFiles"
    />
    <CommitLogSection
      title="Unsynced Commits"
      :commits="unsyncedCommits"
    />
    <CommitLogSection
      title="Synced Commits"
      :commits="syncedCommits"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { commitsStore } from '@/stores/commits.js';

import CommitLogSection from '@/components/commitlog/CommitLogSection.vue';
import CreateCommitForm from '@/components/commitlog/CreateCommitForm.vue';

export default {
  name: 'CommitLog',
  components: {
    CreateCommitForm,
    CommitLogSection
  },
  computed: {
    ...mapState(commitsStore, [
      'uncommitedFiles',
      'unsyncedCommits',
      'syncedCommits'
    ])
  }
};
</script>

<style scoped>
.commit-log {
  width: var(--commit-log-width);
  min-width: var(--commit-log-width);
  max-width: var(--commit-log-width);
  height: calc(100vh - var(--timeline-height));
  background: #FFF2;
  overflow: auto;
}
</style>

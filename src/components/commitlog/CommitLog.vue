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
import CreateCommitForm from '@/components/commitlog/CreateCommitForm.vue';
import CommitLogSection from '@/components/commitlog/CommitLogSection.vue';

export default {
  name: 'CommitLog',
  components: {
    CreateCommitForm,
    CommitLogSection
  },
  computed: {
    uncommitedFiles: function () {
      return [
        'index.html'
      ];
    },
    unsyncedCommits: function () {
      return [
        {}
      ];
    },
    syncedCommits: function () {
      return [
        {},
        {},
        {}
      ];
    }
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

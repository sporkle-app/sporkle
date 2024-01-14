<template>
  <div class="commit-summary-item">
    <div class="commit-summary-item-description truncate">
      <div class="commit-summary-title truncate">
        {{ commit.subject }}
      </div>
      <div
        v-if="commit && commit.author"
        class="commit-summary-subtitle truncate"
      >
        <TimeAgo :date="new Date(commit.author.timestamp)" />
        by
        <span :title="commit.author.email">
          {{ commit.author.name }}
        </span>
      </div>
    </div>
    <div
      class="commit-summary-file-count"
      :title="fileCountTitle"
    >
      {{ fileCount }}
    </div>
  </div>
</template>

<script>
import TimeAgo from '@/components/TimeAgo.vue';

export default {
  name: 'CommitSummaryItem',
  components: {
    TimeAgo
  },
  props: {
    commit: {
      type: Object,
      required: true
    }
  },
  computed: {
    fileCount: function () {
      const count = this.commit?.stats?.length || 0;
      return count.toLocaleString();
    },
    fileCountTitle: function () {
      if (this.fileCount === 1) {
        return '1 file';
      }
      return this.fileCount + ' files';
    }
  }
};
</script>

<style scoped>
.commit-summary-item {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-bottom: 1px solid #FFF4;
}
.commit-summary-item-description {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 8px 10px;
}
.commit-summary-title {
  width: 100%;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
}
.commit-summary-subtitle {
  width: 100%;
  font-size: 13px;
  opacity: 0.7;
}
.commit-summary-file-count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--file-count-width);
  background: #FFF6;
  border-radius: 4px;
  margin: 8px 5px;
  padding: 10px;
  color: #223;
  font-size: 17px;
  font-weight: 400;
}
</style>

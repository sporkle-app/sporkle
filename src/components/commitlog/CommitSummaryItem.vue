<template>
  <div class="commit-summary-item">
    <div class="commit-summary-item-description">
      <div class="commit-summary-title truncate">
        Update unit tests
      </div>
      <div class="commit-summary-subtitle truncate">
        <TimeAgo :date="new Date('Thu Jan 11 18:59:02 2024 -0500')" />
        by
        John Doe
      </div>
    </div>
    <div
      class="commit-summary-file-count"
      title="File count"
    >
      159
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
  margin-bottom: 5px;
  font-size: 17px;
  font-weight: 600;
}
.commit-summary-subtitle {
  opacity: 0.7;
}
.commit-summary-file-count {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFF6;
  border-radius: 4px;
  margin: 8px 5px;
  padding: 10px;
  color: #223;
  font-size: 17px;
  font-weight: 400;
}
</style>

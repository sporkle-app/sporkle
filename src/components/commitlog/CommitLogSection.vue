<template>
  <div class="commit-log-section">
    <CommitLogTitle
      :title="title"
      :count="commits.length"
      @toggle="showCommits = !showCommits"
    />
    <div v-show="showCommits">
      <CommitSummaryItem
        v-for="(commit, commitIndex) in commits"
        :key="'commit' + commitIndex"
      />
    </div>
  </div>
</template>

<script>
import CommitLogTitle from '@/components/commitlog/CommitLogTitle.vue';
import CommitSummaryItem from '@/components/commitlog/CommitSummaryItem.vue';

export default {
  name: 'CommitLogSection',
  components: {
    CommitLogTitle,
    CommitSummaryItem
  },
  props: {
    title: {
      type: String,
      required: true
    },
    commits: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: function () {
    return {
      showCommits: true
    };
  }
};
</script>

<style scoped>
</style>

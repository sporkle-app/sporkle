<template>
  <div class="commit-log-section">
    <CommitLogTitle
      :title="title"
      :count="commits.length"
      :show="showCommits"
      @toggle="showCommits = !showCommits"
    />
    <BaseAccordion :show="showCommits">
      <CommitSummaryItem
        v-for="(commit, commitIndex) in commits"
        :commit="commit"
        :key="'commit' + commitIndex"
      />
    </BaseAccordion>
  </div>
</template>

<script>
import BaseAccordion from '@/components/BaseAccordion.vue';
import CommitLogTitle from '@/components/commitlog/CommitLogTitle.vue';
import CommitSummaryItem from '@/components/commitlog/CommitSummaryItem.vue';

export default {
  name: 'CommitLogSection',
  components: {
    BaseAccordion,
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

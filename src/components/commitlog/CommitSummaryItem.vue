<template>
  <div
    class="commit-summary-item"
    :class="{
      'commit-summary-item-hovered': thisCommitIsHovered,
      'commit-summary-item-selected': thisCommitIsSelected
    }"
    role="button"
    tabindex="0"
    @focus="setHoveredCommitHash(hash)"
    @focusout="clearHoveredCommitHash(hash)"
    @mouseover="setHoveredCommitHash(hash)"
    @mouseout="clearHoveredCommitHash(hash)"
    @click="selectCommit"
    @keyup.enter="selectCommit"
    @keydown.space.prevent="selectCommit"
  >
    <div class="commit-summary-item-description truncate">
      <div
        class="commit-summary-title truncate"
        :title="commit.subject"
      >
        {{ commit.subject }}
      </div>
      <div
        v-if="commit && commit.author"
        class="commit-summary-subtitle truncate"
        :title="subtitleHover"
      >
        <TimeAgo
          :date="new Date(commit.author.timestamp)"
          :showTitle="false"
        />
        by {{ commit.author.name }}
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
import { mapActions, mapState } from 'pinia';

import { commitLogStore } from '@/stores/commitLog.js';
import { fileDiffsStore } from '@/stores/fileDiffs.js';

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
  methods: {
    ...mapActions(commitLogStore, [
      'clearHoveredCommitHash',
      'setHoveredCommitHash',
      'setSelectedCommitHash'
    ]),
    ...mapActions(fileDiffsStore, [
      'getAndParseDiffs'
    ]),
    selectCommit: async function () {
      await this.setSelectedCommitHash(this.hash);
      this.getAndParseDiffs();
    }
  },
  computed: {
    ...mapState(commitLogStore, [
      'hoveredCommitHash',
      'selectedCommitHash'
    ]),
    hash: function () {
      return this.commit?.hash || '';
    },
    hashForComparison: function () {
      // Fallback to random so we don't highlight commits when the hash is empty string
      return this.hash || '' + Math.random();
    },
    thisCommitIsHovered: function () {
      return this.hashForComparison === this.hoveredCommitHash;
    },
    thisCommitIsSelected: function () {
      return this.hashForComparison === this.selectedCommitHash;
    },
    fileCount: function () {
      const count = this.commit?.stats?.length || 0;
      return count.toLocaleString();
    },
    fileCountTitle: function () {
      if (this.fileCount === 1) {
        return '1 file';
      }
      return this.fileCount + ' files';
    },
    subtitleHover: function () {
      const dateTime = new Date(this.commit.author.timestamp);
      return [
        dateTime.toLocaleString(),
        this.commit.author.name,
        this.commit.author.email
      ].join('\n');
    }
  }
};
</script>

<style scoped>
.commit-summary-item {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border: var(--unfocus-ring);
  border-bottom: 1px solid var(--white25);
}
.commit-summary-item-hovered {
  background: var(--black25);
}
.commit-summary-item-selected {
  background: var(--black66);
}
.commit-summary-item:focus {
  border: var(--focus-ring);
  border-top: 1px solid transparent;
  outline: none;
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
  background: var(--white40);
  border-radius: 4px;
  margin: 8px 5px;
  padding: 10px;
  color: var(--inverse-text);
  font-size: 17px;
  font-weight: 400;
}
</style>

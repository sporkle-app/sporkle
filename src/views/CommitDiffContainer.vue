<template>
  <div class="commit-diff-container">
    <CommitLog />
    <FileDiff />
  </div>
</template>

<script>
import CommitLog from '@/components/commitlog/CommitLog.vue';
import FileDiff from '@/components/filediff/FileDiff.vue';

export default {
  name: 'CommitDiffContainer',
  components: {
    CommitLog,
    FileDiff
  }
};
</script>

<style>
.commit-diff-container {
  display: flex;
  height: 100%;
}
</style>

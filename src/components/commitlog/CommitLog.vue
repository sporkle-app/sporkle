<template>
  <div class="commit-log">
    Commit Log.
    <ul>
      <li
        v-for="x in 100"
        :key="'x' + x"
      >
        {{ x }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommitLog'
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

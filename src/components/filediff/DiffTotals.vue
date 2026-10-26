<template>
  <span
    class="total"
    :style="totalColor"
  >
    -{{ totalChanges.removals }}/+{{ totalChanges.inserts }}
  </span>
</template>

<script>
export default {
  name: 'DiffTotals',
  props: {
    files: {
      type: Array,
      default: function () {
        return [];
      }
    },
    insert: {
      type: String,
      default: 'newLines'
    },
    removal: {
      type: String,
      default: 'oldLines'
    }
  },
  computed: {
    totalChanges: function () {
      let inserts = 0;
      let removals = 0;
      this.files.forEach(function (file) {
        if (file && file[this.insert]) {
          inserts = inserts + file[this.insert];
          removals = removals + file[this.removal];
        }
      });
      return {
        inserts,
        removals
      };
    },
    totalColor: function () {
      const diff = this.totalChanges.inserts - this.totalChanges.removals;
      if (diff > 0) {
        return 'background: var(--diff-plus)';
      }
      if (diff < 0) {
        return 'background: var(--diff-minus)';
      }
      if (this.totalChanges.inserts === 0) {
        return '';
      }
      return 'background: var(--black13)';
    }
  }
};
</script>

<style>
.total {
  margin-right: 5px;
  padding: 2px 3px;
  white-space: nowrap;
}
</style>

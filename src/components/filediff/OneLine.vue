<template>
  <div
    class="line"
    :class="{
      'delete-line': line.isDelete,
      'insert-line': line.isInsert,
      'spacer-line': line.isSpacer
    }"
  >
    <div
      class="line-number line-number-old"
      :class="{ 'line-spacer': line.isSpacer }"
    >
      <template v-if="line.isSpacer">
        {{ DOT_DOT_DOT }}
      </template>
      <template v-else-if="line.isDelete || line.isNormal">
        {{ line.oldLineNumber || line.lineNumber }}
      </template>
    </div>
    <div
      class="line-number line-number-new"
      :class="{ 'line-spacer': line.isSpacer }"
    >
      <template v-if="line.isSpacer">
        {{ DOT_DOT_DOT }}
      </template>
      <template v-else-if="line.isInsert || line.isNormal">
        {{ line.newLineNumber || line.lineNumber }}
      </template>
    </div>
    <div class="line-content">
      {{ line.content }}
    </div>
  </div>
</template>

<script>
import { DOT_DOT_DOT } from '@/helpers/constants.js';

export default {
  name: 'OneLine',
  props: {
    line: {
      type: Object,
      required: true
    }
  },
  constants: {
    DOT_DOT_DOT
  }
};
</script>

<style scoped>
.line {
  display: flex;
  font-family: var(--monospace);
}
.line:hover {
  background: var(--muted-accent);
}
.delete-line {
  background: var(--diff-minus);
}
.insert-line {
  background: var(--diff-plus);
}
.spacer-line {
  background: var(--white08);
}
.line-number {
  display: flex;
  align-items: start;
  justify-content: end;
  min-width: 40px;
  padding-right: 4px;
  font-size: 13px;
}
.line-number-old {
  background: var(--black25);
}
.line-number-new {
  background: var(--white08);
}
.line-spacer {
  padding-top: 3px;
  padding-bottom: 1px;
  font-family: var(--sans-serif);
  font-size: 15px;
}
.line-content {
  padding-left: 5px;
  font-size: 15px;
  white-space: pre-wrap;
}
</style>

<template>
  <div
    class="line"
    :class="{
      'delete-line': line.isDelete,
      'insert-line': line.isInsert
    }"
  >
    <div class="line-number line-number-old">
      <template v-if="line.isDelete">
        {{ line.lineNumber }}
      </template>
    </div>
    <div class="line-number line-number-new">
      <template v-if="line.isInsert">
        {{ line.lineNumber }}
      </template>
    </div>
    <div class="line-content">
      {{ line.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'OneLine',
  props: {
    line: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.line {
  display: flex;
}
.delete-line {
  background: var(--diff-minus);
}
.insert-line {
  background: var(--diff-plus);
}
.line-number {
  display: flex;
  align-items: center;
  justify-content: end;
  min-width: 40px;
  padding-right: 4px;
}
.line-number-old {
  background: var(--black25);
}
.line-number-new {
  background: var(--white13);
}
</style>

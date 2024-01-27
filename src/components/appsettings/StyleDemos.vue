<template>
  <div>
    <OneLine
      :line="{
        isNormal: true,
        lineNumber: 1,
        content: 'This line is unchanged.'
      }"
    />
    <OneLine
      :line="{
        isDelete: true,
        oldLineNumber: 2,
        content: 'This is the old line.'
      }"
    />
    <OneLine
      :line="{
        isInsert: true,
        newLineNumber: 2,
        content: 'This is the new line.'
      }"
    />
  </div>
</template>

<script>
import OneLine from '@/components/filediff/OneLine.vue';

export default {
  name: 'StyleDemos',
  components: {
    OneLine
  }
};
</script>

<style scoped>
</style>

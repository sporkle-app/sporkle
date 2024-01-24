<template>
  <div class="one-file">
    <div
      class="file-header truncate"
      :class="{ expanded: !isCollapsed }"
      role="button"
      tabindex="0"
      @click="isCollapsed = !isCollapsed"
      @keyup.enter="isCollapsed = !isCollapsed"
    >
      <BaseIcon
        name="RiArrowDownSFill"
        class="one-file-caret"
        :class="{ 'one-file-rotate-caret': isCollapsed }"
        scale="1.25"
      />
      {{ file.newPath }}
    </div>
    <BaseAccordion :show="!isCollapsed">
      <div
        v-for="(hunk, hunkIndex) in file.hunks"
        :key="'hunk' + hunkIndex"
      >
        <OneLine
          v-for="(line, lineIndex) in hunk.changes"
          :line="line"
          :key="'hunk' + hunkIndex + 'line' + lineIndex"
        />
      </div>
    </BaseAccordion>
  </div>
</template>

<script>
import BaseAccordion from '@/components/BaseAccordion.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import OneLine from '@/components/filediff/OneLine.vue';

export default {
  name: 'OneFile',
  components: {
    BaseAccordion,
    BaseIcon,
    OneLine
  },
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      isCollapsed: true
    };
  }
};
</script>

<style scoped>
.file-header {
  width: 100%;
  background: var(--white13);
}
.file-header.expanded {
  white-space: unset;
  word-break: break-all;
}
.one-file-caret {
  transition: var(--sidebar-transition) ease transform;
}
.one-file-rotate-caret {
  transform: rotate(-90deg);
}
</style>

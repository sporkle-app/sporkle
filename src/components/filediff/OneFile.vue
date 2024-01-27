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
      <template v-if="file.newPath === '/dev/null'">
        {{ file.oldPath }} <em>(deleted)</em>
      </template>
      <template v-else>
        {{ file.newPath }}
      </template>
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
        <OneLine
          v-if="hunkIndex < (file.hunks.length - 1)"
          :line="{
            isNormal: true,
            lineNumber: '...'
          }"
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
      isCollapsed: false
    };
  }
};
</script>

<style scoped>
.file-header {
  position: sticky;
  top: 0px;
  width: 100%;
  background-image: linear-gradient(to right, var(--white25), var(--white25)), linear-gradient(to right, var(--bg), var(--bg));
  border-top: 1px solid var(--white13);
  padding: 2px 2px 5px 2px;
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

<template>
  <div
    class="one-file"
    ref="oneFile"
  >
    <div
      class="file-header"
      :class="{ expanded: !isCollapsed }"
      role="button"
      tabindex="0"
      @click="toggleCollapsed"
      @keyup.enter="toggleCollapsed"
      @keydown.space.prevent="toggleCollapsed"
    >
      <BaseIcon
        name="RiArrowDownSFill"
        class="one-file-caret"
        :class="{ 'one-file-rotate-caret': isCollapsed }"
        scale="1.25"
      />
      <span
        class="file-name"
        :class="{ truncate: isCollapsed }"
        :title="fileNameTitle"
      >
        <template v-if="file.newPath === DEV_NULL">
          <template v-if="isCollapsed">{{ file.oldPath }}&nbsp;</template>
          <span v-else v-html="addWbrToPath(file.oldPath)"></span>
          <em>(deleted)</em>
        </template>
        <template v-else-if="file.oldPath === DEV_NULL">
          <template v-if="isCollapsed">{{ file.newPath }}&nbsp;</template>
          <span v-else v-html="addWbrToPath(file.newPath)"></span>
          <em>(new file)</em>
        </template>
        <template v-else-if="file.oldPath !== file.newPath">
          <template v-if="isCollapsed">{{ file.oldPath }}&nbsp;</template>
          <span v-else v-html="addWbrToPath(file.oldPath)"></span>
          <wbr v-if="!isCollapsed" />
          <BaseIcon
            name="RiFileTransferLine"
            title="renamed"
          />
          <wbr v-if="!isCollapsed" />
          <template v-if="isCollapsed">&nbsp;{{ file.newPath }}&nbsp;</template>
          <span v-else v-html="' ' + addWbrToPath(file.newPath)"></span>
          <wbr v-if="!isCollapsed" />
          <em>(renamed)</em>
        </template>
        <template v-else>
          <template v-if="isCollapsed">{{ file.newPath }}</template>
          <span v-else v-html="addWbrToPath(file.newPath)"></span>
        </template>
      </span>
      <DiffTotals :files="file && file.hunks" />
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
          :line="{ isSpacer: true }"
        />
      </div>
    </BaseAccordion>
  </div>
</template>

<script>
import { DEV_NULL } from '@/helpers/constants.js';

import BaseAccordion from '@/components/BaseAccordion.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import DiffTotals from '@/components/filediff/DiffTotals.vue';
import OneLine from '@/components/filediff/OneLine.vue';

export default {
  name: 'OneFile',
  components: {
    BaseAccordion,
    BaseIcon,
    DiffTotals,
    OneLine
  },
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  constants: {
    DEV_NULL
  },
  data: function () {
    return {
      isCollapsed: false
    };
  },
  methods: {
    addWbrToPath: function (input) {
      const sanitized = window.escape(input);
      return sanitized
        .replaceAll('/', '<wbr />/<wbr />')
        .replaceAll('\\', '<wbr />\\<wbr />')
        .replaceAll('<wbr /><wbr />', '<wbr />') + ' ';
    },
    scrollIntoView: function () {
      const scrollSettings = {
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      };
      this.$refs.oneFile.scrollIntoView(scrollSettings);
    },
    toggleCollapsed: function () {
      this.isCollapsed = !this.isCollapsed;

      let delay = window.getComputedStyle(document.body).getPropertyValue('--sidebar-transition');
      delay = delay.replace('ms', '');
      delay = parseInt(delay);

      // This is still a little stilted/robotic, but good enough for now.
      // May want to pull in a smooth scroll library in the future.
      for (let i = 0; i < delay; i = i + 500) {
        setTimeout(this.scrollIntoView, i);
      }
    }
  },
  computed: {
    fileNameTitle: function () {
      if (!this.isCollapsed) {
        return undefined;
      }
      const oldPath = this.file?.oldPath;
      const newPath = this.file?.newPath;
      if (newPath === DEV_NULL) {
        return oldPath + ' (deleted)';
      } else if (oldPath === DEV_NULL) {
        return newPath + ' (new file)';
      } else if (oldPath !== newPath) {
        return '- ' + oldPath + '\n+ ' + newPath;
      }
      return newPath;
    }
  }
};
</script>

<style scoped>
.file-header {
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(to right, var(--white25), var(--white25)), linear-gradient(to right, var(--bg), var(--bg));
  border: var(--unfocus-ring);
  border-top: 1px solid var(--white13);
  padding: 2px 2px 5px 2px;
}
.file-header:focus {
  border: var(--focus-ring);
  outline: none;
}
.file-header.expanded {
  white-space: unset;
  word-break: break-all;
}
.file-header em {
  opacity: 0.5;
}
.file-name {
  flex-grow: 1;
}

.one-file-caret {
  transition: var(--sidebar-transition) ease transform;
}
.one-file-rotate-caret {
  transform: rotate(-90deg);
}
</style>

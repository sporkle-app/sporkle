<template>
  <!--
    Sync "loop" icon is part of Remix,
    but not in oh-vue-icons yet,
    temporarily using as SVG.
  -->
  <svg
    v-if="normalizedName === 'ri-loop-right-line'"
    class="ov-icon custom-svg"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z"
    />
  </svg>
  <VIcon
    v-else
    v-bind="{
      ...$attrs,
      name: normalizedName
    }"
    :class="computedClasses"
  />
</template>

<script>
import _kebabCase from 'lodash-es/kebabCase.js';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as icons from 'oh-vue-icons/icons/index.js';

const allImportedIcons = [
  icons.RiArrowDownSFill,
  icons.RiArrowGoBackLine,
  icons.RiCheckboxBlankLine,
  icons.RiCheckboxCircleLine,
  icons.RiCheckboxFill,
  icons.RiCheckLine,
  icons.RiCloseLine,
  icons.RiErrorWarningLine,
  icons.RiGitBranchLine,
  icons.RiGitMergeLine,
  icons.RiInformationLine,
  icons.RiLayoutColumnFill,
  icons.RiLayoutColumnLine,
  icons.RiLoader5Fill,
  icons.RiMagicLine,
  icons.RiSettings5Fill
];
const customIcons = [
  'RiLoopRightLine'
];
const allIconNames = [
  ...allImportedIcons.map((icon) => {
    return _kebabCase(icon.name);
  }),
  ...customIcons.map((icon) => {
    return _kebabCase(icon);
  })
];

// Register icons
addIcons(...allImportedIcons);

export default {
  name: 'BaseIcon',
  components: {
    VIcon: OhVueIcon
  },
  props: {
    name: {
      type: String,
      required: true,
      validator: function (value) {
        const valid = allIconNames.includes(_kebabCase(value));
        if (!valid) {
          console.log('Your icon, ' + value + ', is not imported and/or registered. Do so in BaseIcon.vue');
        }
        return valid;
      }
    }
  },
  computed: {
    computedClasses: function () {
      const iconClassMap = {
        'ri-git-branch-line': 'rotate-90',
        'ri-git-merge-line': 'rotate-flip'
      };
      return iconClassMap[this.normalizedName] || '';
    },
    normalizedName: function () {
      return _kebabCase(this.name);
    }
  }
};
</script>

<style scoped>
.custom-svg {
  width: 19.19px;
  height: 19.19px;
}
.rotate-90 {
  transform: rotate(90deg);
}
.rotate-flip {
  transform: scale(1, -1) rotate(90deg);
}
</style>

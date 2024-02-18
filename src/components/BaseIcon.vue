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

  <!-- Custom made icon by combining repo and search icons from remix -->
  <svg
    v-else-if="normalizedName === 'ri-scan-for-repos'"
    class="ov-icon custom-scan-for-repos-svg"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    :viewBox="'0 0 ' + (960 * 0.6) + ' ' + (560 * 0.6)"
  >
    <path d="M491.709 487.334h-11.71v58.332l-70-46.666-70 46.666v-58.332h-11.667c-45.103 0-81.667-36.564-81.667-81.668V114c0-38.66 31.34-70 70-70h326.666c12.887 0 23.334 10.447 23.334 23.333v193.393a144.368 144.368 0 0 0-46.668-14.947V90.667H316.666v234.159a82.673 82.673 0 0 1 11.667-.826h141.593a144.38 144.38 0 0 0-14.513 46.666h-127.08c-19.33 0-35 15.672-35 35 0 19.33 15.67 35 35 35H340V394h114.208c1.004 35.836 15.029 68.47 37.501 93.334zM386.666 184H340v46.667h46.667V184zm0-70H340v46.667h46.667V114zM340 300.668h46.667V254H340v46.668zm359.718 222.885-49.026-49.026c-14.897 8.999-32.36 14.18-51.034 14.18-54.589 0-98.843-44.253-98.843-98.843s44.254-98.843 98.843-98.843 98.843 44.253 98.843 98.843c0 19.001-5.366 36.746-14.658 51.812l48.877 48.877-33.002 33zm-47.888-133.69c0-28.769-23.404-52.173-52.173-52.173s-52.173 23.404-52.173 52.173 23.404 52.173 52.173 52.173 52.173-23.404 52.173-52.173z" />
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
  icons.RiAddCircleFill,
  icons.RiArrowDownSFill,
  icons.RiArrowGoBackLine,
  icons.RiCheckboxBlankLine,
  icons.RiCheckboxCircleLine,
  icons.RiCheckboxFill,
  icons.RiCheckLine,
  icons.RiCloseLine,
  icons.RiErrorWarningLine,
  icons.RiFileCopyFill,
  icons.RiFolderAddFill,
  icons.RiFolderOpenFill,
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
  'RiLoopRightLine',
  'RiScanForRepos'
];
export const allIconNames = [
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
          console.info('Your icon, ' + value + ', is not imported and/or registered. Do so in BaseIcon.vue');
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
.custom-scan-for-repos-svg {
  width: 28px;
  height: 28px;
  margin-right: 10px;
  transform: translate(-9px, -5px);
}
.rotate-90 {
  transform: rotate(90deg);
}
.rotate-flip {
  transform: scale(1, -1) rotate(90deg);
}
</style>

<template>
  <ViewWrapper
    v-if="nw.process.versions['nw-flavor'] === 'sdk'"
    title="Dev Testing Page"
  >
    <div>
      <button @click="addSuccessAlert(SMALL)">Success</button>
      <button @click="addErrorAlert(SMALL, ERROR)">Error</button>
    </div>
    <div>
      <button @click="addSuccessAlert(BIG)">Big Success</button>
      <button @click="addErrorAlert(BIG, ERROR_BIG)">Big Error</button>
    </div>
    <button @click="doStuff">Do stuff</button>
  </ViewWrapper>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import ViewWrapper from '@/views/ViewWrapper.vue';

const SMALL = 'Lorem ipsum dolor sit amet.';
const BIG = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const ERROR = 'Detailed error message.';
const ERROR_BIG = [
  ERROR,
  BIG,
  BIG
    .replaceAll(' ', '')
    .replaceAll(',', '')
    .replaceAll('.', '')
].join('\n\n');

export default {
  name: 'DevTestingPage',
  constants: {
    BIG,
    ERROR,
    ERROR_BIG,
    SMALL
  },
  components: {
    ViewWrapper
  },
  methods: {
    doStuff: function () {
      const gitDiffParser = window.require('gitdiff-parser');
      const exec = require('child_process').execSync;
      const gitDiffText = String(exec('git diff'));
      const result = gitDiffParser.parse(gitDiffText);
      console.log({ result });
    },
    ...mapActions(alertsStore, [
      'addErrorAlert',
      'addSuccessAlert'
    ])
  }
};
</script>

<style scoped>
</style>

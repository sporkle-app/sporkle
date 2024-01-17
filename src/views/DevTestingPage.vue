<template>
  <ViewWrapper
    v-if="nw.process.versions['nw-flavor'] === 'sdk'"
    title="Dev Testing Page"
  >
    <div>
      <button @click="addSuccess">Success</button>
      <button @click="addError">Error</button>
    </div>
    <div>
      <button @click="addBigSuccess">Big Success</button>
      <button @click="addBigError">Big Error</button>
    </div>
  </ViewWrapper>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import ViewWrapper from '@/views/ViewWrapper.vue';

const small = 'Lorem ipsum dolor sit amet.';
const big = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default {
  name: 'DevTestingPage',
  components: {
    ViewWrapper
  },
  methods: {
    addSuccess: function () {
      this.addAlert({
        message: small
      });
    },
    addError: function () {
      this.addAlert({
        message: small,
        error: 'bad'
      });
    },
    addBigSuccess: function () {
      this.addAlert({
        message: big
      });
    },
    addBigError: function () {
      this.addAlert({
        message: big,
        error: 'bad'
      });
    },
    ...mapActions(alertsStore, [
      'addAlert'
    ])
  }
};
</script>

<style scoped>
</style>

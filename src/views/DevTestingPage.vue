<template>
  <ViewWrapper
    v-if="nw.process.versions['nw-flavor'] === 'sdk'"
    title="Dev Testing Page"
  >
    <div>
      <button @click="addSuccess">Success</button>
      <button @click="addError">Error</button>
    </div>
  </ViewWrapper>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import ViewWrapper from '@/views/ViewWrapper.vue';

export default {
  name: 'DevTestingPage',
  components: {
    ViewWrapper
  },
  methods: {
    addSuccess: function () {
      this.addAlert({
        message: 'All good'
      });
    },
    addError: function () {
      this.addAlert({
        message: 'Oh no',
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

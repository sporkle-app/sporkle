<template>
  <div class="global-alerts">
    <BaseAlert v-if="alertMessage" :message="alertMessage" />
  </div>
</template>

<script>
import { mapState } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import BaseAlert from '@/components/BaseAlert.vue';

export default {
  name: 'GlobalAlerts',
  components: {
    BaseAlert
  },
  computed: {
    alertMessage: function () {
      return this.alerts?.[0];
    },
    ...mapState(alertsStore, [
      'alerts'
    ])
  }
};
</script>

<style scoped>
.global-alerts {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 20;
}
</style>

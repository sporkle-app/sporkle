<template>
  <BaseAlert v-if="alertMessage" :message="alertMessage" />
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

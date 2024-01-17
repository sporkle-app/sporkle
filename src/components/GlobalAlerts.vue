<template>
  <TransitionGroup
    class="global-alerts"
    name="global-alerts"
    tag="div"
  >
    <BaseAlert
      v-for="alert in alerts"
      :alert="alert"
      :key="alert.id"
    />
  </TransitionGroup>
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
    ...mapState(alertsStore, [
      'alerts'
    ])
  }
};
</script>

<style>
.global-alerts {
  position: fixed;
  right: 16px;
  bottom: 0px;
  width: 100%;
  max-width: 570px;
  transition: 0.3s ease all;
  z-index: 800;
}

/* Transitions */
.global-alerts-enter {
  opacity: 0.0;
  transform: translateY(70px);
}

.global-alerts-enter-from {
  position: relative;
  z-index: 800;
}

.global-alerts-leave-to {
  position: relative;
  z-index: 801;
}

.global-alerts-enter-from,
.global-alerts-leave-to {
  opacity: 0.0;
  transform: translateY(70px);
}

.global-alerts-leave-active {
  position: absolute;
  width: 100%;
  padding-bottom: 0px;
  transition: 800ms ease all, 0s ease padding;
  z-index: 801;
}
</style>

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

import BaseAlert from '@/components/alerts/BaseAlert.vue';

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
  max-width: calc(100% - var(--sidebar-width) - var(--alert-spacing));
  transition: 0.3s ease all, var(--sidebar-transition) ease max-width;
  z-index: 900;
}

.sidebar-hidden + .global-alerts {
  max-width: calc(100% - var(--alert-spacing));
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

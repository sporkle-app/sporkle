<template>
  <div
    :class="alert.status"
    class="global-alert"
    role="button"
    tabindex="0"
    @focusin="setHover(true)"
    @focusout="setHover(false)"
    @mouseover="setHover(true)"
    @mouseout="setHover(false)"
  >
    <span
      class="float-right"
      role="button"
      tabindex="0"
      @keydown.enter="deleteAlert"
      @keydown.space="deleteAlert"
      @click="deleteAlert"
    >
      <BaseIcon name="RiCloseLine" />
      <CountdownCircle
        v-if="alert.delay"
        data-test="CountdownCircle"
        data-cy="CountdownCircle"
        :duration="alert.delay"
        :hover="alert.hover"
        @countdownFinished="deleteAlert"
      />
    </span>
    <div>
      <strong v-if="alert.status === 'error'">Error:</strong>
      <strong v-else>Success:</strong>
      <span
        v-text="alert.message"
        class="global-alert-message"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import BaseIcon from '@/components/BaseIcon.vue';
import CountdownCircle from '@/components/CountdownCircle.vue';

export default {
  name: 'BaseAlert',
  components: {
    BaseIcon,
    CountdownCircle
  },
  props: {
    alert: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(alertsStore, [
      'deleteById',
      'setHoverById'
    ]),
    deleteAlert: function () {
      this.deleteById(this.alert.id);
    },
    setHover: function (bool) {
      this.setHoverById(this.alert.id, bool);
    }
  }
};
</script>

<style scoped>
.global-alert {
  position: relative;
  display: block;
  background: var(--popout);
  margin: 16px 0px 16px 16px;
  padding: 16px;
  line-height: 1.5;
}
.global-alert-message {
  margin-left: 5px;
}

.global-alerts-leave-active.global-alert {
  width: calc(100% - 16px);
}
.error {
  background: var(--link);
}
.float-right {
  float: right;
}
</style>

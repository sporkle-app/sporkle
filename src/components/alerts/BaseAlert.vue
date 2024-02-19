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
      class="close-alert"
      role="button"
      tabindex="0"
      @keydown.enter="deleteAlert"
      @keydown.space="deleteAlert"
      @click="deleteAlert"
    >
      <BaseIcon
        name="RiCloseLine"
        scale="1.1"
      />
      <CountdownCircle
        v-if="alert.delay"
        :duration="alert.delay"
        :hover="alert.hover"
        @countdownFinished="deleteAlert"
      />
    </span>
    <div class="global-alert-title">
      <template v-if="alert.status === 'error'">
        <BaseIcon
          class="global-alert-title-icon"
          name="RiErrorWarningLine"
          scale="1.4"
        />
        <strong>Error:</strong>
      </template>
      <template v-else>
        <BaseIcon
          class="global-alert-title-icon"
          name="RiCheckLine"
          scale="1.4"
        />
        <strong>Success:</strong>
      </template>
    </div>
    <div class="global-alert-overflow">
      <span
        v-text="alert.message"
        class="global-alert-message"
      ></span>
      <pre
        v-if="alert.error"
        v-text="alert.error"
        class="global-alert-error-message"
      ></pre>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';

import BaseIcon from '@/components/BaseIcon.vue';
import CountdownCircle from '@/components/alerts/CountdownCircle.vue';

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
  background: var(--muted-accent);
  border: var(--unfocus-ring);
  margin: var(--alert-spacing);
  margin-right: 0px;
  padding: var(--alert-spacing);
  color: var(--white);
  line-height: 1.5;
}
.global-alert:focus {
  border: var(--focus-ring);
  outline: none;
}
.global-alert,
.global-alert:focus {
  border-left: 35px solid var(--white25);
}
.global-alert-title-icon {
  position: absolute;
  top: 0;
  left: -30px;
  height: 100%;
  opacity: 1;
}
.error .global-alert-title-icon {
  color: var(--accent);
}
.success .global-alert-title-icon {
  color: var(--muted-accent);
}
.global-alert-overflow {
  max-height: 140px;
  word-break: break-word;
  overflow: auto;
}
.global-alert-message {
  display: inline-block;
}
.global-alert-error-message {
  background: var(--black25);
  padding: 5px;
  font-family: monospace;
  white-space: break-spaces;
}
.global-alert-title strong {
  font-size: 19px;
  line-height: 32px;
}
.global-alerts-leave-active.global-alert {
  width: calc(100% - var(--alert-spacing));
}
.error {
  background: var(--accent);
}
.close-alert {
  border: var(--unfocus-ring);
  float: right;
}
.close-alert:focus {
  border: var(--focus-ring);
  outline: none;
}
</style>

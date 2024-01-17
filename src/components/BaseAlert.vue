<template>
  <div
    :class="status"
    class="alert"
    tabindex="0"
    @focusin="hover = true"
    @focusout="hover = false"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <span
      class="float-right"
      tabindex="0"
      @keydown.enter="deleteAlert"
      @click="deleteAlert"
    >
      <BaseIcon name="RiCloseLine" />
      <CountdownCircle
        v-if="delay"
        data-test="CountdownCircle"
        data-cy="CountdownCircle"
        :duration="delay"
        :hover="hover"
        @countdownFinished="deleteAlert"
      />
    </span>
    <slot></slot>
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
    id: {
      type: [String, Number],
      required: false,
      default: undefined
    },
    // The alert status, used for styling alert
    status: {
      type: String,
      required: false,
      default: 'success',
      validator: function (value) {
        return ['success', 'error'].includes(value);
      }
    },
    delay: {
      type: Number,
      required: false,
      default: undefined
    },
    // Which item in the alert group to remove if alert is dismissed
    index: {
      type: Number,
      required: false,
      default: undefined
    }
  },
  data: function () {
    return {
      hover: false,
      statusIcons: {
        success: 'fa-check',
        error: 'fa-exclamation-triangle'
      }
    };
  },
  methods: {
    ...mapActions(alertsStore, [
      'deleteById',
      'deleteByIndex'
    ]),
    deleteAlert: function () {
      // For global alerts
      if (this.id) {
        this.deleteById(this.id);
      // For looped alerts
      } else if (typeof(this.index) === 'number') {
        this.deleteByIndex(this.index);
      // For one-offs
      } else {
        this.$emit('dismissClicked');
      }
    }
  }
};
</script>

<style scoped>
.alert {
  position: relative;
  display: block;
  background: var(--popout);
  margin: 16px 0px 16px 16px;
  padding: 16px;
  line-height: 1.5;
}

.global-alerts-leave-active.alert {
  width: calc(100% - 16px);
}
.error {
  background: var(--link);
}
.float-right {
  float: right;
}
</style>

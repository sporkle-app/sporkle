<template>
  <div
    class="base-accordion"
    :class="{ 'base-accordion-hide': !show }"
  >
    <div class="base-accordion-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    transitionMs: {
      type: Number,
      default: 750
    }
  },
  data: function () {
    return {
      showContent: true
    };
  },
  computed: {
    transition: function () {
      return this.transitionMs + 'ms';
    }
  }
};
</script>

<style scoped>
.base-accordion {
  display: grid;
  grid-template-rows: 1fr;
  transition: v-bind(transition) ease grid-template-rows;
}
.base-accordion-inner {
  grid-row: 1 / span 2;
  overflow: hidden;
}
.base-accordion-hide {
  grid-template-rows: 0fr;
}
</style>

<template>
  <div :style="accordionContainer">
    <div :style="accordionInner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    direction: {
      type: String,
      default: 'up',
      validator: function (value) {
        return ['up', 'left'].includes(value);
      }
    },
    show: {
      type: Boolean,
      default: true
    },
    speedMs: {
      type: Number,
      default: 750
    }
  },
  computed: {
    accordionContainer: function () {
      let type = 'rows';
      if (this.direction === 'left') {
        type = 'columns';
      }
      let frames = '1';
      if (!this.show) {
        frames = '0';
      }
      return [
        'display: grid',
        'grid-template-' + type + ': ' + frames + 'fr',
        'transition: ' + this.speedMs + 'ms ease grid-template-' + type
      ].join(';');
    },
    accordionInner: function () {
      let type = 'row';
      if (this.direction === 'left') {
        type = 'column';
      }
      return [
        'grid-' + type + ': 1 / span 2',
        'overflow: hidden'
      ].join(';');
    }
  }
};
</script>

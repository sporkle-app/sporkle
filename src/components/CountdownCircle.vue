<template>
  <svg
    class="countdown-circle"
    :style="svgStyle"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle v-bind="circleAttributes" />
  </svg>
</template>

<script>
/**
 * MAGIC NUMBERS!
 *
 * Changing the size means you'll also need to manually test and update these other
 * numbers, tweaking them until it looks/works right. I couldn't figure out the
 * ratio between size and these other numbers, so I had to hard code them. All other
 * ratios are set in the computed properties already.
 */
const size = 36;
const initialOffset = 56;
const initialIndex = 13;
const lowerBound = -14;
const dashArray = 112;

export default {
  name: 'CountdownCircle',
  props: {
    hover: {
      type: Boolean,
      required: false,
      default: false
    },
    duration: {
      type: Number,
      default: 15000
    }
  },
  data: function () {
    return {
      interval: null,
      index: initialIndex
    };
  },
  methods: {
    decrement: function () {
      if (!this.hover) {
        if (this.index > lowerBound) {
          this.index = this.index - 1;
        } else {
          this.index = lowerBound;
          clearInterval(this.interval);
          this.$emit('countdownFinished');
        }
      }
    }
  },
  computed: {
    svgStyle: function () {
      return [
        'width:' + size + 'px',
        'height:' + size + 'px'
      ].join(';');
    },
    multiplier: function () {
      const time = Math.round(this.duration / 1000);
      return initialOffset / time;
    },
    dashOffset: function () {
      return initialOffset - (this.index - 1) * this.multiplier;
    },
    speed: function () {
      let distance = initialIndex - lowerBound;
      return Math.round(this.duration / distance);
    },
    circleStyle: function () {
      return [
        'transition: ' + this.speed + 'ms linear all',
        'stroke-dashoffset: ' + this.dashOffset,
        'stroke-dasharray: ' + dashArray
      ].join(';');
    },
    circleAttributes: function () {
      const strokeWidth = 2;
      return {
        r: (size / 2) - strokeWidth,
        cy: size / 2,
        cx: size / 2,
        'stroke-width': strokeWidth,
        class: 'circle-path',
        style: this.circleStyle
      };
    }
  },
  created: function () {
    this.interval = setInterval(this.decrement, this.speed);
  },
  beforeDestroy: function () {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.countdown-circle {
  position: absolute;
  top: 9px;
  right: 8px;
  stroke: currentColor;
  transform: rotate(-90deg);
}
.circle-path {
  fill: none;
}
</style>

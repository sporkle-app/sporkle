<template>
  <div class="range-slider">
    <label :for="forId">
      <slot></slot>
      <span class="range-slider-value">
        {{ modelValue }}
      </span>
    </label>
    <input
      :id="forId"
      class="range-slider-input"
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="emit"
    />
  </div>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 360
    }
  },
  methods: {
    emit: function ($event) {
      this.$emit('update:modelValue', parseInt($event.target.value));
    }
  },
  computed: {
    forId: function () {
      return 'range-slider-' + Math.round(Math.random() * 100000);
    }
  }
};
</script>

<style scoped>
.range-slider {
  margin-top: 20px;
}
.range-slider-value {
  margin-left: 8px;
  font-size: 14px;
  opacity: 0.5;
}
.range-slider-input {
  display: block;
  width:  100%;
}
</style>

<template>
  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2">
    <label
      :for="id"
      class="form-label"
    >
      {{ label }}:
    </label>
    <input
      :id="id"
      :value="modelValue"
      type="range"
      class="form-range"
      :min="min"
      :max="max"
      @input="($event) => $emit('update:modelValue', $event.currentTarget.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  }
};
</script>

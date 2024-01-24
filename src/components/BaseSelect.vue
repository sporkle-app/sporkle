<template>
  <span>
    <label
      class="label"
      :class="{ 'sr-only': !showLabel }"
      :for="forId"
    >
      {{ label }}:
    </label>
    <select
      :id="forId"
      :value="modelValue"
      class="base-select"
      @input="update"
    >
      <option
        v-for="(option, optionIndex) in options"
        :value="option"
        :key="'option' + optionIndex"
      >
        {{ option }}
      </option>
    </select>
  </span>
</template>

<script>
import helpers from '@/helpers/index.js';

export default {
  name: 'BaseSelect',
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  emits: ['update:modelValue'],
  methods: {
    update: function ($event) {
      this.$emit('update:modelValue', $event.target.value);
    }
  },
  computed: {
    forId: function () {
      return 'id' + helpers.generateUniqueId();
    }
  }
};
</script>

<style scoped>
.base-select {
  width: 100%;
}
</style>

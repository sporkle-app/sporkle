<template>
  <label
    :aria-checked="modelValue"
    class="checkbox"
    role="checkbox"
    tabindex="0"
    @keyup.enter="emit"
    @keyup.space="emit"
    @click.stop.prevent="emit"
  >
    <BaseIcon
      :name="modelValue ? 'RiCheckboxFill' : 'RiCheckboxBlankLine'"
      class="checkbox-icon"
    />
    <input
      :value="modelValue"
      class="sr-only"
      @input="emit"
    />
    <slot></slot>
  </label>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'BaseCheckbox',
  components: {
    BaseIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emit: function () {
      this.$emit('update:modelValue', !this.modelValue);
    }
  }
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
}
.checkbox-icon {
  margin-right: 5px;
}
</style>

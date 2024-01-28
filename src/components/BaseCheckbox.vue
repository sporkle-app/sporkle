<template>
  <label
    :for="forId"
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
      :id="forId"
      :value="modelValue"
      class="sr-only"
      tabindex="-1"
      @input.stop="emit"
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
  },
  computed: {
    forId: function () {
      return 'checkbox-' + Math.round(Math.random() * 100000);
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

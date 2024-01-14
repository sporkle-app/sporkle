<template>
  <label
    class="checkbox"
    role="checkbox"
    tabindex="0"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <VIcon
      :name="modelValue ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'"
      class="checkbox-icon"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
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

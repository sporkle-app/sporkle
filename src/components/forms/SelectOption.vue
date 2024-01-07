<template>
  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2">
    <label
      :for="id"
      class="form-label"
    >
      {{ label }}:
    </label>
    <select
      :id="id"
      :value="modelValue"
      class="form-select"
      @input="($event) => $emit('update:modelValue', $event.currentTarget.value)"
    >
      <option
        v-for="(item, index) in list"
        :value="item"
        :key="id + item + index"
      >
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectOption',
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
      type: String,
      default: null
    },
    list: {
      type: Array,
      required: true,
      validator: function (value) {
        const onlyContainsStrings = !value.filter(function (item) {
          return typeof(item) !== 'string';
        }).length;
        return onlyContainsStrings;
      }
    }
  }
};
</script>

<template>
  <div class="one-file">
    <div class="file-header" @click="isCollapsed = !isCollapsed">
      <span v-if="isCollapsed">&gt;</span>
      <span v-else>v</span>
      {{ file.path }}
    </div>
    <div v-if="!isCollapsed" class="file-diff-container">
      File Diff Contents go here
    </div>
  </div>
</template>

<script>
export default {
  name: 'OneFile',
  props: {
    file: {
      type: Object,
      required: true,
      validator: function (val) {
        let validity = true;
        if (!val || !val.path || typeof(val.path) !== 'string') {
          validity = false;
        }
        return validity;
      }
    }
  },
  data: function () {
    return {
      isCollapsed: true
    };
  }
};
</script>

<template>
  <button
    class="commit-log-title"
    @click.prevent="$emit('toggle')"
  >
    {{ title }} ({{ count }})
  </button>
</template>

<script>
export default {
  name: 'CommitLogTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.commit-log-title {
  width: 100%;
  background: #FFF2;
  padding: 10px;
  font-size: 20px;
  text-align: left;
}
</style>

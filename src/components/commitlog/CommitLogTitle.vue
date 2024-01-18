<template>
  <button
    class="commit-log-title"
    @click.prevent="$emit('toggle')"
  >
    <span>
      {{ title }} ({{ count.toLocaleString() }})
    </span>
    <BaseIcon
      name="RiArrowDownSFill"
      class="commit-log-caret"
      :class="{ 'commit-log-rotate-caret': !show }"
      scale="1.25"
    />
  </button>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'CommitLogTitle',
  components: {
    BaseIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.commit-log-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: var(--white13);
  padding: 10px;
  font-size: 20px;
  text-align: left;
}
.commit-log-caret {
  transition: var(--sidebar-transition) ease transform;
}
.commit-log-rotate-caret {
  transform: rotate(90deg);
}
</style>

<template>
  <span :title="date.toLocaleString()">
    {{ timeAgo(date) }}
  </span>
</template>

<script>
import timesago from 'timesago';

export default {
  name: 'TimeAgo',
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  methods: {
    timeAgo: timesago
  }
};
</script>

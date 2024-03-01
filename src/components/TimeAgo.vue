<template>
  <span :title="showTitle? date.toLocaleString() : undefined">
    {{ timeAgo(date) }}
  </span>
</template>

<script>
import timesago from 'timesago';

export default {
  name: 'TimeAgo',
  props: {
    date: {
      type: [String, Number, Date],
      required: true
    },
    showTitle: {
      type: Boolean,
      defaut: true
    }
  },
  methods: {
    timeAgo: function (date) {
      if (typeof(date) === 'string') {
        return date;
      }
      return timesago(date);
    }
  }
};
</script>

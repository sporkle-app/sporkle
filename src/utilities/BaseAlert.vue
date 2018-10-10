<template>
  <transition name="slideup">
    <div class="alert-container">
      <div class="alert error">
        <span class="close" @click="closeAlert">&times;</span>
        <strong>Error: </strong>
        <span class="message">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseAlert',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    closeAlert: function () {
      this.$store.commit('setAppError', '');
    }
  }
};
</script>

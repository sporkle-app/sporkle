<template>
  <transition name="slideup">
    <div class="alert-container">
      <div class="alert error">
        <button
          class="close"
          @click="$emit('close')"
        >&times;</button>
        <strong>Error: </strong>
        <span class="message">{{ message.replace('Error: ', '') }}</span>
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
  }
};
</script>

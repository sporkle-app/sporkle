<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>

          <div v-if="title" class="modal-header">
            {{ title }}
            <span class="modal-close" @click="$emit('close')">&times;</span>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

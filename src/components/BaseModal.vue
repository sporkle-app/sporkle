<template>
  <transition name="modal">
    <div
      class="modal-mask"
      role="button"
      tabindex="0"
      @click="$emit('close')"
      @keyup.enter="$emit('close')"
    >
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>

          <div v-if="title" class="modal-header">
            {{ title }}
            <span
              v-text="'&times;'"
              class="modal-close"
              role="button"
              tabindex="0"
              @click="$emit('close')"
              @keyup.enter="$emit('close')"
            ></span>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                v-text="'OK'"
                class="modal-default-button"
                @click="$emit('close')"
              ></button>
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

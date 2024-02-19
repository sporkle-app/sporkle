<template>
  <BaseIcon
    class="close-view"
    name="RiCloseLine"
    scale="2"
    tabindex="0"
    @keyup.enter="setLoadingAndNavigate"
    @keyup.space="setLoadingAndNavigate"
    @click="setLoadingAndNavigate"
  />
</template>

<script>
import { mapActions } from 'pinia';

import { appLoadingStore } from '@/stores/appLoading.js';

import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'CloseView',
  components: {
    BaseIcon
  },
  methods: {
    setLoadingAndNavigate: function () {
      this.setRoutingLoading(true);
      setTimeout(() => {
        this.$router.push({ name: 'home' });
      }, 0);
    },
    ...mapActions(appLoadingStore, [
      'setRoutingLoading'
    ])
  }
};
</script>

<style scoped>
.close-view {
  position: absolute;
  top: 20px;
  right: 23px;
  border: var(--unfocus-ring);
  color: var(--accent);
  font-size: 27px;
  text-decoration: none;
}
.close-view:focus {
  border: var(--focus-ring);
  outline: none;
}
</style>

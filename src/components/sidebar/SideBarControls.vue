<template>
  <div class="sidebar-controls">
    <div class="button-group">
      <button>Add</button>
      <button>Create</button>
      <button>Clone</button>
    </div>
    <div class="filter-and-settings">
      <input type="text" />
      <span @click="showSettings = true">🔧</span>
    </div>
    <base-modal
      v-if="showSettings"
      title="Settings"
      @close="showSettings = false"
    >
      <div slot="header">Settings</div>
      <div slot="body">
        <app-settings />
      </div>
      <div slot="footer"></div>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from '@/utilities/BaseModal.vue';
import AppSettings from '@/views/AppSettings.vue';

export default {
  name: 'SideBarControls',
  components: {
    'app-settings': AppSettings,
    'base-modal': BaseModal
  },
  data: function () {
    return {
      showSettings: false
    };
  }
};
</script>

<template>
  <div class="sidebar-controls">
    <div class="button-group">
      <input
        id="repochoice"
        type="file"
        nwdirectory
        class="hide"
        @change="repoPicked($event)"
      />
      <button @click="addRepo">Add</button>
      <button :disabled="true">Create</button>
      <button :disabled="true">Clone</button>
    </div>
    <div class="filter-and-settings">
      <input :disabled="true" type="text" />
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
      repoChoice: '',
      showSettings: false
    };
  },
  methods: {
    addRepo: function () {
      document.getElementById('repochoice').click();
    },
    repoPicked: function (evt) {
      this.$store.dispatch('reposList/addRepoToListAndSave', evt.target.value);
    }
  }
};
</script>

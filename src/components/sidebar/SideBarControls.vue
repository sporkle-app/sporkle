<template>
  <div class="sidebar-controls">

    <div class="button-group">
      <label for="repochoice" class="hide">
        Select repo
      </label>
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
      <span @click="showAbout = true">❔</span>
    </div>

    <BaseModal
      v-if="showSettings"
      title="Settings"
      @close="showSettings = false"
    >
      <template #body>
        <AppSettings />
      </template>
    </BaseModal>

    <BaseModal
      v-if="showAbout"
      title="About"
      @close="showAbout = false"
    >
      <template #body>
        <AboutApp />
      </template>
    </BaseModal>

  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue';
import AboutApp from '@/views/AboutApp.vue';
import AppSettings from '@/views/AppSettings.vue';

export default {
  name: 'SideBarControls',
  components: {
    AboutApp,
    AppSettings,
    BaseModal
  },
  data: function () {
    return {
      repoChoice: '',
      showAbout: false,
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

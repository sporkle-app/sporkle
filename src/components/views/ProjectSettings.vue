<template>
  <div>
    <h2
      v-if="appConfig?.project?.title"
      v-html="appConfig?.project?.title"
    ></h2>
    {{ id }}
    <input v-model="projectName" />
    <div class="d-flex justify-content-end mt-3">
      <button
        class="btn btn-danger me-2"
        @click="deleteProject"
      >
        Delete
      </button>
      <button
        class="btn btn-primary pull-right"
        @click="saveOrCreate"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { settingsStore } from '@/stores/appSettings.js';

export default {
  name: 'ProjectSettings',
  data: function () {
    return {
      projectName: ''
    };
  },
  methods: {
    go: function (id) {
      this.$router.push({ path: '/project/' + id });
    },
    saveOrCreate: async function () {
      if (this.id === 'new') {
        let id = await settingsStore().createProject(this.dataToSave);
        this.go(id);
      } else {
        settingsStore().updateProject(this.dataToSave);
      }
    },
    deleteProject: function () {
      settingsStore().deleteProject(this.dataToSave);
      this.go('new');
    }
  },
  computed: {
    id: function () {
      let id = this.$route.params.id;
      if (id !== 'new') {
        id = parseInt(id);
      }
      return id;
    },
    dataToSave: function () {
      return {
        id: this.id,
        projectName: this.projectName
      };
    }
  }
};
</script>

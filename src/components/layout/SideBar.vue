<template>
  <aside
    class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
    :style="'width: ' + sidebarWidth + 'px;'"
  >
    <div class="btn-group-vertical">
      <button
        v-for="project in projects"
        :class="buttonClasses(project.id)"
        @click="go('/project/' + project.id)"
        :key="'project' + project.id"
      >
        {{ project.projectName }}
      </button>
    </div>
    <hr v-if="projects.length" />
    <div class="btn-group-vertical">
      <button
        :class="'btn btn-' + sidebarAdd"
        @click="go('/project/new')"
      >
        Add
      </button>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'pinia';

import { settingsStore } from '@/stores/appSettings.js';

export default {
  name: 'SideBar',
  methods: {
    buttonClasses: function (id) {
      const classes = [
        'btn',
        'text-truncate'
      ];

      if (this.currentPage.endsWith('/' + id)) {
        classes.push('btn-' + this.sidebarButtonActive);
      } else {
        classes.push('btn-' + this.sidebarButton);
      }

      return classes.join(' ');
    },
    go: function (path) {
      this.$router.push({ path });
    }
  },
  computed: {
    currentPage: function () {
      return this.$route.fullPath;
    },
    ...mapState(settingsStore, [
      'sidebarWidth',
      'sidebarButton',
      'sidebarButtonActive',
      'sidebarAdd',
      'projects'
    ])
  }
};
</script>

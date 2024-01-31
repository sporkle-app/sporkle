<template>
  <ViewWrapper title="Scan for repos">
    <ReposFolderPicker />
    <table>
      <thead>
        <tr>
          <th>
            <BaseCheckbox />
          </th>
          <th>Folder</th>
          <th colspan="2">Last commit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(folder, folderIndex) in potentialRepoFolders"
          @click="folder.selected = !folder.selected"
          :key="'folder' + folderIndex"
        >
          <td>
            <BaseCheckbox v-model="folder.selected" />
          </td>
          <td>
            {{ folder.name }}
          </td>
          <td class="right">
            {{ formatDate(folder.lastCommit) }}
          </td>
          <td>
            {{ formatTime(folder.lastCommit) }}
          </td>
        </tr>
      </tbody>
    </table>
  </ViewWrapper>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { reposStore } from '@/stores/repos.js';

import BaseCheckbox from '@/components/BaseCheckbox.vue';
import ReposFolderPicker from '@/components/appsettings/ReposFolderPicker.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';

export default {
  name: 'ScanForRepos',
  components: {
    BaseCheckbox,
    ReposFolderPicker,
    ViewWrapper
  },
  methods: {
    ...mapActions(reposStore, [
      'scanForRepos'
    ]),
    formatDate: function (date) {
      if (!date) {
        return null;
      }
      return (new Date(date)).toLocaleDateString();
    },
    formatTime: function (date) {
      if (!date) {
        return null;
      }
      return (new Date(date)).toLocaleTimeString();
    }
  },
  computed: {
    ...mapState(reposStore, [
      'potentialRepoFolders',
      'reposFolder'
    ])
  },
  watch: {
    reposFolder: function () {
      this.scanForRepos();
    }
  },
  created: function () {
    this.scanForRepos();
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
tr:hover {
  background: var(--white13);
}
.right {
  text-align: right;
}
</style>

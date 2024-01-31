<template>
  <ViewWrapper title="Scan for repositories">
    <ReposFolderPicker />
    <p v-if="!potentialRepoFolders.length">
      No repositories found.
    </p>
    <template v-else>
      <button :disabled="!selectedPotentialRepos.length">
        Add {{ selectedPotentialRepos.length }} repositories
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <BaseCheckbox
                v-model="selectAll"
                @click="setAllCheckboxes(this.selectAll)"
              />
            </th>
            <th>Folder</th>
            <th colspan="2">Last commit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(repo, repoIndex) in potentialRepoFolders"
            :class="{ 'selected': repo.selected }"
            @click="repo.selected = !repo.selected"
            :key="'repo' + repoIndex"
          >
            <td>
              <BaseCheckbox v-model="repo.selected" />
            </td>
            <td>
              {{ repo.name }}
            </td>
            <td class="right">
              {{ formatDate(repo.lastCommit) }}
            </td>
            <td>
              {{ formatTime(repo.lastCommit) }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
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
  data: function () {
    return {
      selectAll: false
    };
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
    },
    setAllCheckboxes: function (bool) {
      this.potentialRepoFolders.forEach((repo) => {
        repo.selected = bool;
      });
    }
  },
  computed: {
    ...mapState(reposStore, [
      'potentialRepoFolders',
      'reposFolder'
    ]),
    selectedPotentialRepos: function () {
      return this.potentialRepoFolders.filter((repo) => {
        return repo.selected;
      });
    }
  },
  watch: {
    reposFolder: function () {
      this.scanForRepos();
    },
    selectedPotentialRepos: function (newValue) {
      if (newValue === 0) {
        this.selectAll = false;
      }
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
.selected {
  background: var(--muted-accent);
}
.selected:hover {
  background: var(--accent);
}
.right {
  text-align: right;
}
</style>

<template>
  <ViewWrapper title="Bulk add repositories">
    <ReposFolderPicker />
    <p
      v-if="!potentialRepoFolders.length"
      class="no-repos"
    >
      No new repositories found.
    </p>
    <template v-else>
      <div class="button-container">
        <button
          :disabled="!selectedPotentialRepos.length"
          @click="addRepos"
        >
          Add
          <strong>{{ selectedPotentialRepos.length }}</strong>
          repositories
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <BaseCheckbox
                v-model="selectAll"
                @click="setAllCheckboxes(selectAll)"
              />
            </th>
            <th class="left">
              Folder
            </th>
            <th colspan="2">
              Last commit
            </th>
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
              {{ repo.title }}
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

import { andSaveStore } from '@/stores/andSave.js';
import { appLoadingStore } from '@/stores/appLoading.js';
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
    ...mapActions(andSaveStore, [
      'bulkAddReposAndSave'
    ]),
    ...mapActions(appLoadingStore, [
      'setRoutingLoading'
    ]),
    ...mapActions(reposStore, [
      'scanForRepos',
      'setCurrentRepo'
    ]),
    addRepos: async function () {
      if (this.selectedPotentialRepos.length === 1) {
        await this.setRoutingLoading(true);
        // Show spinner before navigating
        await this.$forceUpdate();

        await this.bulkAddReposAndSave(this.selectedPotentialRepos);
        await this.setCurrentRepo(this.selectedPotentialRepos[0].filePath);
        await this.$router.push({ name: 'commits' });
      } else {
        this.bulkAddReposAndSave(this.selectedPotentialRepos);
      }
    },
    formatDate: function (date) {
      if (!date) {
        return;
      }
      return (new Date(date)).toLocaleDateString();
    },
    formatTime: function (date) {
      if (!date) {
        return;
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
      'reposFolder',
      'reposList'
    ]),
    selectedPotentialRepos: function () {
      return this.potentialRepoFolders
        .filter((repo) => {
          return repo.selected;
        });
    }
  },
  watch: {
    reposList: function () {
      this.scanForRepos();
    },
    reposFolder: function () {
      this.scanForRepos();
    },
    selectedPotentialRepos: function (newValue) {
      if (newValue.length === 0) {
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
.no-repos {
  color: var(--white40);
  font-style: italic;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
}
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
.left {
  text-align: left;
}
</style>

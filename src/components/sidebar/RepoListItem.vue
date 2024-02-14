<template>
  <button
    :title="repo.filePath"
    class="repo-list-item truncate"
    :class="{ 'is-current-repo': isCurrentRepo }"
    @click="loadRepo"
    @contextmenu.prevent="showContextMenu($event)"
  >
    {{ repo.title }}
  </button>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { andSaveStore } from '@/stores/andSave.js';
import { appLoadingStore } from '@/stores/appLoading.js';
import { reposStore } from '@/stores/repos.js';

const fs = window.require('fs');

export default {
  name: 'RepoListItem',
  props: {
    repo: {
      type: Object,
      required: true,
      validator: function (repo) {
        let title = repo.title && typeof(repo.title) === 'string';
        let filePath = repo.filePath && typeof(repo.filePath) === 'string';
        return title && filePath;
      }
    }
  },
  methods: {
    loadRepo: async function () {
      this.setSidebarLoading(true);
      // show spinner before navigating
      this.$forceUpdate();

      const repoPath = this.repo.filePath;

      await this.setCurrentRepoAndSave(repoPath);
      if (repoPath && !fs.existsSync(repoPath)) {
        await this.$router.push({ name: 'missingRepo' });
      } else {
        await this.$router.push({ name: 'commits' });
      }
      this.setSidebarLoading(false);
    },
    showContextMenu: function ($event) {
      let menu = new window.nw.Menu();

      const items = [
        {
          label: 'Remove repo from list',
          click: async () => {
            await this.removeRepoFromListAndSave(this.repo.filePath);
            if (!this.reposList.length) {
              this.$router.push({ name: 'scanForRepos' });
            }
          }
        },
        {
          label: 'Open in file explorer',
          click: () => {
            window.nw.Shell.openItem(this.repo.filePath);
          }
        }
      ];

      items.forEach((item) => {
        menu.append(window.nw.MenuItem(item));
      });

      menu.popup($event.pageX, $event.pageY);
    },
    ...mapActions(andSaveStore, [
      'removeRepoFromListAndSave',
      'setCurrentRepoAndSave'
    ]),
    ...mapActions(appLoadingStore, [
      'setSidebarLoading'
    ])
  },
  computed: {
    isCurrentRepo: function () {
      return this.repo.filePath === this.currentRepo;
    },
    ...mapState(reposStore, [
      'currentRepo',
      'reposList'
    ])
  }
};
</script>

<style>
.repo-list-item {
  width: 100%;
  border: var(--unfocus-ring);
  border-radius: 0px;
  margin: 0px;
  text-align: left;
}
.repo-list-item:focus-visible {
  background: var(--button-hover);
  border: var(--focus-ring);
  outline: none;
}
.is-current-repo,
.is-current-repo:focus {
  background: var(--button-active);
}
.is-current-repo:hover {
  background: var(--button-active-hover);
}
</style>

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
import { reposStore } from '@/stores/repos.js';

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
    loadRepo: function () {
      this.setCurrentRepoAndSave(this.repo.filePath);
      this.$router.push({
        name: 'commits'
      });
    },
    showContextMenu: function ($event) {
      let menu = new window.nw.Menu();

      const items = [
        {
          label: 'Remove repo from list',
          click: () => {
            this.removeRepoFromListAndSave(this.repo.filePath);
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
    ])
  },
  computed: {
    isCurrentRepo: function () {
      return this.repo.filePath === this.currentRepo;
    },
    ...mapState(reposStore, [
      'currentRepo'
    ])
  }
};
</script>

<style>
.repo-list-item {
  width: 100%;
  border-radius: 0px;
  margin: 0px;
  text-align: left;
}
.repo-list-item:focus-visible {
  background: var(--button-hover);
  outline: none;
}
.is-current-repo,
.is-current-repo:focus {
  background: #ABF2;
}
</style>

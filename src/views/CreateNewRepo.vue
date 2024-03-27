<template>
  <ViewWrapper title="Create a new repository">
    <ReposFolderPicker />
    <label for="repoName">
      <strong>
        New repository Name:
      </strong>
    </label>
    <div class="new-repo">
      <input
        v-model="repoName"
        id="repoName"
        type="text"
      />
    </div>
      <strong>
        Will create new repository at this location:
      </strong>
    <div>{{ repoPath }}</div>
    <button @click="createNewRepo">
      Create new repository
    </button>
  </ViewWrapper>
</template>

<script>
import { mapState } from 'pinia';
import ReposFolderPicker from '@/components/appsettings/ReposFolderPicker.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';
import { reposStore } from '@/stores/repos.js';

import helpers from '@/helpers/index.js';

const fs = window.require('fs');
const path = window.require('path');

export default {
  name: 'CreateNewRepo',
  components: {
    ViewWrapper,
    ReposFolderPicker
  },
  data: function () {
    return {
      repoName: ''
    };
  },
  methods: {
    createNewRepo: function () {
      const alreadyExist = fs.existsSync( this.repoPath );
      if (!alreadyExist) {
        // create repo somehow
      }
    }
  },
  computed: {
    repoPath: function () {
      const repoName = helpers.fileSystemSafeString(this.repoName);
      if ( repoName ) {
        return path.join( this.reposFolder, repoName );
      } 
    },
    ...mapState(reposStore, [
      'reposFolder'
    ])
  }
};
</script>

<style scoped>
.new-repo {
  display: flex;
}
</style>

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
        v-model="fileName"
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
    
    
    <div>
      {{  reposFolder }}
    </div>
  </ViewWrapper>
</template>

<script>
import { mapState } from 'pinia';
import ReposFolderPicker from '@/components/appsettings/ReposFolderPicker.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';
import { reposStore } from '@/stores/repos.js';

export default {
  name: 'CreateNewRepo',
  components: {
    ViewWrapper,
    ReposFolderPicker
  },
  data: function () {
    return {
      fileName: ''
    };
  },
  computed: {
    repoPath: function () {
      const fileName = this.fileName.trim().toLowerCase().replace(/\s+/g, '-');

      return `${ this.reposFolder }/${ fileName }`;
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

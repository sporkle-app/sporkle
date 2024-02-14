<template>
  <ViewWrapper title="Create a new repository">
    <ReposFolderPicker />
    <label for="repos-folder-input">
      <strong>
        New repository Name:
      </strong>
    </label>
    <div class="new-repo">
      <input
        type="text"
        id="nameRepo"
        class="nameRepo"
      />
    </div>
      <label>
          <strong>
            Will create new repository at this location:
          </strong>
        </label>
      <div>{{ filePath }}</div>
      <button @click="createNewRepo">
        Create new repository
      </button>

    
    
    <div>
      
    </div>
  </ViewWrapper>
</template>

<script>
import ViewWrapper from '@/views/ViewWrapper.vue';
import ReposFolderPicker from '@/components/appsettings/ReposFolderPicker.vue';

export default {
  name: 'CreateNewRepo',
  components: {
    ViewWrapper,
    ReposFolderPicker,
  },
  methods: {
    updateFilePath() {
      const fileName = this.fileName.trim().toLowerCase().replace(/\s+/g, '-');

      this.filePath = `${ reposFolder }/${ fileName }`;
    }
  }
};
</script>

<style scoped>
.new-repo {
  display: flex;
}
.repos-folder-input {
  flex-grow: 1;
}
</style>

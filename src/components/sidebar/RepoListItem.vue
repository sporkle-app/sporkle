<template>
  <div
    :title="repo.filePath"
    class="repo-list-item"
  >
    <RouterLink
      v-text="repo.title"
      :to="{ name: 'commits' }"
    />
  </div>
</template>

<script>
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
  }
};
</script>

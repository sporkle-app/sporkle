<template>
  <div :title="repo.filePath" class="repo-list-item">
    {{ repo.title }}
  </div>
</template>

<script>
export default {
  name: 'RepoListItem',
  props: {
    repo: {
      type: Object,
      required: true,
      validator: function (val) {
        let title = val.title && typeof(val.title) === 'string';
        let filePath = val.filePath && typeof(val.filePath) === 'string';
        return title && filePath;
      }
    }
  }
};
</script>

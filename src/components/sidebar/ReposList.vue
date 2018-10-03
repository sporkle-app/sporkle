<template>
  <div class="repos-list">
    <div
      v-for="(repo, repoIndex) in repos"
      :key="'repo' + repoIndex"
    >
      {{ repo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReposList',
  computed: {
    repos: function () {
      let list = [];
      for (let i = 0; i < 200; i++) {
        list.push('Repo ' + (i + 1));
      }
      return list;
    }
  }
};
</script>

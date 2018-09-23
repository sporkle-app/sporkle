<template>
  <div class="commitlog">
    Commit Log.
    <button @click="openDevTools">
      Open Dev tools
    </button>
    <button @click="getBranches">
      Get Branches
    </button>
    <input v-model="newRepoPath" type="text" @keyup.enter="setNewRepoPath" />
    <div>
      <strong>App Loading</strong>: <pre>{{ appLoading }}</pre>
    </div>
    <div>
      <strong>App Error</strong>: <pre>{{ appError }}</pre>
    </div>
    <div>
      <strong>Repo Path</strong>: <pre>{{ repoPath }}</pre>
    </div>
    <div>
      <strong>Branches</strong>: <pre>{{ branches }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'CommitLog',
  data: function () {
    return {
      newRepoPath: ''
    };
  },
  methods: {
    openDevTools: function () {
      window.nw.Window.get().showDevTools();
    },
    getBranches: function () {
      this.$store.dispatch('getBranchList');
    },
    setNewRepoPath: function () {
      this.$store.commit('setRepoPath', this.newRepoPath);
      this.getBranches();
    }
  },
  computed: {
    ...mapState([
      'appLoading',
      'appError',
      'branches',
      'repoPath'
    ])
  }
};
</script>

<template>
  <div class="create-commit-form">
    <CommitLogTitle
      title="Uncommitted Changes"
      :count="files.length"
      @toggle="showForm = !showForm"
    />
    <div v-show="showForm">
      <input
        v-model="summary"
        class="create-commit-summary"
        placeholder="Summary"
      >
      <textarea
        v-model="description"
        class="create-commit-description"
        placeholder="Description"
      ></textarea>
      <button
        class="create-commit-button truncate"
        :disabled="!summary"
        :title="'Commit to ' + currentBranch"
        @click="createCommit"
      >
        <VIcon
          name="ri-checkbox-circle-line"
          animation="ring"
          hover
          scale="1.2"
        />
        Commit to {{ currentBranch }}
      </button>
    </div>
  </div>
</template>

<script>
import CommitLogTitle from '@/components/commitlog/CommitLogTitle.vue';

export default {
  name: 'CreateCommitForm',
  components: {
    CommitLogTitle
  },
  props: {
    files: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  data: function () {
    return {
      showForm: true,
      summary: '',
      description: ''
    };
  },
  methods: {
    createCommit: function () {
      if (!this.summary) {
        return;
      }
      console.log('git commit -m "' + this.summary + '" -m "' + this.description + '"');
      let success = true;
      if (success) {
        this.summary = '';
        this.description = '';
      }
    }
  },
  computed: {
    currentBranch: function () {
      return 'current-branch-name';
    }
  }
};
</script>

<style>
.create-commit-form {
}
.create-commit-summary {
  margin: 10px;
}
.create-commit-description {
  margin-bottom: 5px;
}
.create-commit-summary,
.create-commit-description {
  width: calc(100% - 20px);
  margin-right: 10px;
  margin-left: 10px;
}
.create-commit-button {
  width: 100%;
  background: transparent;
}
</style>

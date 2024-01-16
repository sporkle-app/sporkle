<template>
  <div>
    <CommitLogTitle
      title="Uncommitted Changes"
      :count="files.length"
      :show="showForm"
      @toggle="showForm = !showForm"
    />
    <BaseAccordion :show="showForm">
      <label class="sr-only" for="create-commit-summary">
        Commit Summary Title
      </label>
      <input
        v-model="summary"
        id="create-commit-summary"
        class="create-commit-summary"
        placeholder="Summary"
      />
      <label class="sr-only" for="create-commit-description">
        Optional commit description
      </label>
      <textarea
        v-model="description"
        id="create-commit-description"
        class="create-commit-description"
        placeholder="Description"
      ></textarea>
      <button
        class="create-commit-button truncate"
        :disabled="!summary"
        :title="'Commit to ' + currentBranch"
        @focusin="hoverCreate = true"
        @focusout="hoverCreate = false"
        @mouseover="hoverCreate = true"
        @mouseout="hoverCreate = false"
        @click="createCommit"
      >
        <BaseIcon
          name="RiCheckboxCircleLine"
          :animation="hoverCreate ? 'wrench' : undefined"
          scale="1.2"
          speed="slow"
        />
        Commit to {{ currentBranch }}
      </button>
    </BaseAccordion>
  </div>
</template>

<script>
import BaseAccordion from '@/components/BaseAccordion.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import CommitLogTitle from '@/components/commitlog/CommitLogTitle.vue';

export default {
  name: 'CreateCommitForm',
  components: {
    BaseAccordion,
    BaseIcon,
    CommitLogTitle
  },
  props: {
    files: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data: function () {
    return {
      showForm: true,
      hoverCreate: false,
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

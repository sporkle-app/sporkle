<template>
  <div class="timeline">
    <div class="branch-dropdowns">
      <BaseSelect
        v-model="baseBranch"
        label="Base Branch"
        :showLabel="false"
        :options="branchNames"
      />
      <BaseSelect
        v-model="currentBranchSelect"
        label="Current Branch"
        :showLabel="false"
        :options="branchNames"
      />
    </div>
    Time line
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { branchesStore } from '@/stores/branches.js';

import BaseSelect from '@/components/BaseSelect.vue';

export default {
  name: 'TimeLine',
  components: {
    BaseSelect
  },
  data: function () {
    return {
      baseBranch: ''
    };
  },
  methods: {
    ...mapActions(branchesStore, [
      'changeCurrentBranch'
    ]),
    resetBaseBranch: function () {
      this.baseBranch = this.defaultBranch;
    }
  },
  computed: {
    ...mapState(branchesStore, [
      'branchNames',
      'currentBranch',
      'defaultBranch'
    ]),
    currentBranchSelect: {
      get: function () {
        return this.currentBranch;
      },
      set: async function (branchName) {
        await this.changeCurrentBranch(branchName);
      }
    }
  },
  watch: {
    currentBranch: function () {
      this.resetBaseBranch();
    },
    defaultBranch: function () {
      this.resetBaseBranch();
    }
  },
  created: function () {
    this.resetBaseBranch();
  }
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: row;
}
.branch-dropdowns {
  display: flex;
  flex-direction: column;
}
</style>

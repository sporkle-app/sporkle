<template>
  <span class="create-branch-container">
    <button
      class="toggle-branch-button"
      :class="{ active: branchPopoutVisible }"
      title="Create branch"
      @click="branchPopoutVisible = !branchPopoutVisible"
    >
      <BaseIcon name="RiGitBranchLine" />
    </button>
    <Transition name="fade">
      <div
        v-if="branchPopoutVisible"
        class="create-branch-popout"
        :class="{
          show: branchPopoutVisible,
          shift: sidebarCollapsed
        }"
      >
        <button
          class="x-icon"
          @click="branchPopoutVisible = false"
        >
          <BaseIcon
            name="RiCloseLine"
            scale="1.2"
          />
        </button>

        <h3 class="popout-title">Create a new branch</h3>

        <label class="label" for="new-branch-name">
          Name:
        </label>
        <input
          v-model="newBranchName"
          id="new-branch-name"
          class="new-branch-name-input"
          placeholder="New branch name"
        />

        <BaseSelect
          v-model="baseBranchForCreation"
          label="Base branch"
          :options="branchNames"
        />

        <button
          class="create-branch-button"
          :disabled="!newBranchName || !baseBranchForCreation"
          @focusin="hoverCreate = true"
          @focusout="hoverCreate = false"
          @mouseover="hoverCreate = true"
          @mouseout="hoverCreate = false"
          @click="createBranch"
        >
          <BaseIcon
            name="RiCheckboxCircleLine"
            :animation="hoverCreate ? 'wrench' : undefined"
            scale="1.2"
            speed="slow"
          />
          Create new branch
        </button>
      </div>
    </Transition>
  </span>
</template>

<script>
import { mapState } from 'pinia';

import { branchesStore } from '@/stores/branches.js';
import { sidebarStore } from '@/stores/sidebar.js';

import BaseIcon from '@/components/BaseIcon.vue';
import BaseSelect from '@/components/BaseSelect.vue';

export default {
  name: 'CreateBranchPopout',
  components: {
    BaseIcon,
    BaseSelect
  },
  data: function () {
    return {
      baseBranchForCreation: null,
      branchPopoutVisible: false,
      newBranchName: '',
      hoverCreate: false
    };
  },
  methods: {
    createBranch: function () {
      console.log('git checkout -b ' + this.newBranchName + ' ' + this.baseBranchForCreation);
    }
  },
  computed: {
    ...mapState(branchesStore, [
      'branchNames',
      'defaultBranch'
    ]),
    ...mapState(sidebarStore, [
      'sidebarCollapsed'
    ])
  },
  watch: {
    defaultBranch: function (newValue) {
      this.baseBranchForCreation = newValue;
    }
  }
};
</script>

<style scoped>
.toggle-branch-button {
  height: var(--top-button-height);
  margin-right: 5px;
  transition: var(--sidebar-transition) ease all, 0s ease border;
}
.active {
  background: var(--popout);
}
.create-branch-popout {
  position: absolute;
  top: 26px;
  left: -108px;
  width: 260px;
  background: var(--popout);
  padding: 10px;
  transition: var(--sidebar-transition) ease all;
  z-index: 9;
}

.shift {
  left: -44px;
}
.popout-title {
  margin: 4px 0px 10px 0px;
}
.create-branch-container {
  position: relative;
  font-size: 14px;
}
.x-icon {
  position: absolute;
  top: 4px;
  right: 4px;
}
.label {
  display: block;
  margin: 5px 0px;
}
.new-branch-name-input {
  width: 100%;
  margin-bottom: 5px;
}
.create-branch-button {
  width:  100%;
  margin-top: 10px;
}
</style>

<template>
  <ViewWrapper
    v-if="nw.process.versions['nw-flavor'] === 'sdk'"
    title="Dev Testing Page"
  >
    <IconsGallery />

    <section>
      <button
        v-if="!confirmDelete"
        @click="confirmDelete = true"
      >
        Delete app settings file
      </button>
      <template v-else>
        <div>
          Are you sure?
        </div>
        <button @click="deleteSettings">Yes, delete settings file</button>
        <button @click="confirmDelete = false">No, keep settings file</button>
      </template>
    </section>

    <section>
      <h3>Test Alerts</h3>
      <div>
        <button @click="addSuccessAlert(SMALL)">Success</button>
        <button @click="addErrorAlert(SMALL, ERROR)">Error</button>
      </div>
      <div>
        <button @click="addSuccessAlert(BIG)">Big Success</button>
        <button @click="addErrorAlert(BIG, ERROR_BIG)">Big Error</button>
      </div>
    </section>

    <section>
      <BaseCheckbox v-model="showSelectLabel">
        Show label
      </BaseCheckbox>
      <BaseSelect
        v-model="example"
        label="Example"
        :showLabel="showSelectLabel"
        :options="['Item 1', 'Item 2', 'Item 3']"
        class="parent-class"
      />
      {{ example }}
    </section>
  </ViewWrapper>
</template>

<script>
import { mapActions } from 'pinia';

import { alertsStore } from '@/stores/alerts.js';
import { saveLoadDataStore } from '@/stores/saveLoadData.js';

import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import IconsGallery from '@/components/devtesting/IconsGallery.vue';
import ViewWrapper from '@/views/ViewWrapper.vue';

const SMALL = 'Lorem ipsum dolor sit amet.';
const BIG = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const ERROR = 'Detailed error message.';
const ERROR_BIG = [
  ERROR,
  BIG,
  BIG
    .replaceAll(' ', '')
    .replaceAll(',', '')
    .replaceAll('.', '')
].join('\n\n');

export default {
  name: 'DevTestingPage',
  constants: {
    BIG,
    ERROR,
    ERROR_BIG,
    SMALL
  },
  components: {
    BaseCheckbox,
    BaseSelect,
    IconsGallery,
    ViewWrapper
  },
  data: function () {
    return {
      confirmDelete: false,
      example: undefined,
      showSelectLabel: true
    };
  },
  methods: {
    ...mapActions(alertsStore, [
      'addErrorAlert',
      'addSuccessAlert'
    ]),
    ...mapActions(saveLoadDataStore, [
      'deleteSettings'
    ])
  }
};
</script>

<style scoped>
section {
  margin-bottom: 20px;
}
.parent-class {
  display: block;
  width: 50%;
}
</style>

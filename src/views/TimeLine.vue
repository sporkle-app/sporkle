<template>
  <div class="timeline">
    <button @click="toggleSidebar" ref="testToggleSidebar">
      <template v-if="sidebarCollapsed">➡</template>
      <template v-else>⬅</template>
    </button>
    Timeline
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TimeLine',
  methods: {
    toggleSidebar: function () {
      this.$store.commit('toggleSidebarCollapsed');
    }
  },
  computed: {
    ...mapState([
      'sidebarCollapsed'
    ])
  }
};
</script>

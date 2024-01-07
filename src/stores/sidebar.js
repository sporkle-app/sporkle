import { defineStore } from 'pinia';

export const sidebarStore = defineStore('sidebar', {
  state: function () {
    return {
      sidebarCollapsed: false
    };
  },
  actions: {
    setSidebarCollapsed: function (bool) {
      this.sidebarCollapsed = bool;
    },
    toggleSidebarCollapsed: function () {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
});

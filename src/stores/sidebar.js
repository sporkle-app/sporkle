import { defineStore } from 'pinia';

export const sidebarStore = defineStore('sidebar', {
  state: function () {
    return {
      sidebarCollapsed: false
    };
  },
  actions: {
    toggleSidebarCollapsed: function () {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
});

import { defineStore } from 'pinia';

export const alertsStore = defineStore('alerts', {
  state: function () {
    return {
      alerts: []
    };
  },
  actions: {
    setAppError: function (message) {
      this.alerts.push(message);
    }
  }
});

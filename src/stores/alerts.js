import { defineStore } from 'pinia';

import helpers from '@/helpers/index.js';

const countdownDuration = 20 * 1000;
const intervalDuration = 15;

export const alertsStore = defineStore('alerts', {
  state: function () {
    return {
      alerts: [],
      intervals: {}
    };
  },
  actions: {
    addAlert: function (payload) {
      const id = helpers.generateUniqueId();
      let status = payload.status || 'success';
      const message = payload.message;
      const error = payload.error;
      const delay = 15000;

      if (payload.error) {
        status = 'error';
      }

      const alert = {
        id,
        status,
        message,
        delay,
        error,
        progressBar: 100,
        hover: false,
        visible: true
      };

      this.alerts.push(alert);

      if (status !== 'error') {
        this.countdownThenHideThenDeleteById(alert.id);
      }
    },
    pauseCountdown: function (id) {
      this.setHoverById(id, true);
    },
    resumeCountdown: function (id) {
      this.setHoverById(id, false);
    },
    setHoverById: function (id, bool) {
      const index = this.alerts.findIndex((alert) => {
        return alert.id === id;
      });
      if (index > -1) {
        this.alerts[index].hover = bool;
      }
    },
    countdownThenHideThenDeleteById: function (id) {
      this.intervals[id] = setInterval(() => {
        const index = this.alerts.findIndex((alert) => {
          return alert.id === id;
        });
        if (index > -1 && !this.alerts[index].hover) {
          const reduceBarBy = (intervalDuration / countdownDuration) * 100;
          let value = this.alerts[index].progressBar;
          value = Math.max(value - reduceBarBy, 0);
          this.alerts[index].progressBar = value;
          if (value === 0) {
            setTimeout(() => {
              this.hideThenDeleteById(id);
            }, 100);
          }
        }
      }, intervalDuration);
    },
    hideById: function (id) {
      const index = this.alerts.findIndex((alert) => {
        return alert.id === id;
      });
      if (index > -1) {
        // Determines whether to show/hide the alert and triggers Vuetify animations
        this.alerts[index].visible = false;
      }
    },
    deleteById: function (id) {
      if (this.intervals[id]) {
        clearInterval(this.intervals[id]);
      }
      const index = this.alerts.findIndex((alert) => {
        return alert.id === id;
      });
      if (index > -1) {
        this.alerts.splice(index, 1);
      }
    },
    hideThenDeleteById: function (id) {
      this.hideById(id);
      // Wait for the hide animation to finish before deleting the alert
      setTimeout(() => {
        // This actually removes the alert from the array of global alerts
        this.deleteById(id);
      }, 600);
    }
  }
});

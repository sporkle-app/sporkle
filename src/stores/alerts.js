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
    addErrorAlert: function (message, error) {
      const status = 'error';
      this.addAlert({ message, error, status });
    },
    addSuccessAlert: function (message) {
      this.addAlert({ message });
    },
    addAlert: function (payload) {
      const id = helpers.generateUniqueId();
      let status = payload.status || 'success';
      const message = payload.message;
      const error = payload.error;
      let delay = payload.delay || 15000;

      if (error || status === 'error') {
        delay = undefined;
        status = 'error';
      }

      const alert = {
        id,
        status,
        message,
        delay,
        error,
        progressBar: 100,
        hover: false
      };

      this.alerts.push(alert);

      if (status !== 'error') {
        this.countdownThenDeleteById(alert.id);
      }
    },
    setHoverById: function (id, bool) {
      const index = this.alerts.findIndex((alert) => {
        return alert.id === id;
      });
      if (index > -1) {
        this.alerts[index].hover = bool;
      }
    },
    countdownThenDeleteById: function (id) {
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
              this.deleteById(id);
            }, 100);
          }
        }
      }, intervalDuration);
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
      delete this.intervals[id];
    }
  }
});

import Vue from 'vue';

import App from './App.vue';
import store from './store';
import '@/sass/themes/all-themes.sass';

Vue.config.productionTip = false;

let app = new Vue({
  store,
  render: function (html) {
    return html(App);
  },
  beforeCreate: function () {
    // Load settings
    this.$store.dispatch('appSettings/loadSettings');
    // Check if git is installed globally
  }
}).$mount('#app');

window.deleteSettings = function () {
  app.$store.dispatch('appSettings/deleteSettings');
};

import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

import '@/sass/themes/all-themes.sass';

new Vue({
  store,
  render: function (html) {
    return html(App);
  },
  beforeCreate: function () {
    // Load settings
    this.$store.dispatch('loadSettings');
    // Check if git is installed globally
  }
}).$mount('#app');

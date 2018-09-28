import Vue from 'vue';
import App from './App.vue';
import store from './store';

import '@/sass/themes/darkmode.sass';
import '@/sass/themes/highcontrast.sass';
import '@/sass/themes/lightmode.sass';

Vue.config.productionTip = false;

new Vue({
  store,
  render: function (html) {
    return html(App);
  },
  beforeCreate: function () {
    // Load settings
    // Check if git is installed globally
  }
}).$mount('#app');

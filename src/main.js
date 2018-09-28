import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: function (html) {
    return html(App);
  },
  beforeCreate: function () {
    // Load settings
    this.$store.dispatch('getThemes');
    this.$store.dispatch('loadSettings');
    // Check if git is installed globally
  }
}).$mount('#app');

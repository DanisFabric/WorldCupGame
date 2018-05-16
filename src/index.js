
import 'babel-polyfill';
import Vue from 'vue/dist/vue.common';
import App from './App.vue';
import router from './router/index';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App />',
});

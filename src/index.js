import 'babel-polyfill';
import Vue from 'vue/dist/vue.common';
import Toasted from 'vue-toasted';
import 'material-design-icons/iconfont/material-icons.css';

import App from './App.vue';
import router from './router/index';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(Toasted);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App />',
});

import Vue from 'vue/dist/vue.common';
import Vuex from 'vuex';

Vue.use(Vuex);
/* eslint no-param-reassign: 0 */

const store = new Vuex.Store({
  state: {
    isAddLotteryModalVisible: false,
  },
  mutations: {
    openAddLotteryModal(state) {
      state.isAddLotteryModalVisible = true;
    },
    closeAddLotteryModal(state) {
      state.isAddLotteryModalVisible = false;
    },
  },
});

export default store;

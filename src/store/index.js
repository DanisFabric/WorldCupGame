import Vue from 'vue/dist/vue.common';
import Vuex from 'vuex';

Vue.use(Vuex);
/* eslint no-param-reassign: 0 */

const store = new Vuex.Store({
  state: {
    isAddLotteryModalVisible: false,
    isCheckLotteryModalVisible: false,
  },
  mutations: {
    openAddLotteryModal(state) {
      state.isAddLotteryModalVisible = true;
    },
    closeAddLotteryModal(state) {
      state.isAddLotteryModalVisible = false;
    },
    openCheckLotteryModal(state) {
      state.isCheckLotteryModalVisible = true;
    },
    closeCheckLotteryModal(state) {
      state.isCheckLotteryModalVisible = false;
    },
  },
});

export default store;

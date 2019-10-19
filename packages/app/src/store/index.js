import Vue from 'vue';
import Vuex from 'vuex';

import { getRandomCard } from 'poule-poule-lib';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardStack: []
  },
  mutations: {
    ADD_CARD(state, cardType) {
      state.cardStack.push(cardType);
    }
  },
  actions: {
    addRandomCard({ commit }) {
      commit('ADD_CARD', getRandomCard());
    }
  },
  modules: {}
});

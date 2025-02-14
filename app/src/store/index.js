import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { getRandomCard } from 'poule-poule-lib'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardStack: [],
    players: [],
    result: null,
    user: null
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cardStack = cards
    },
    ADD_CARD(state, cardType) {
      state.cardStack.push(cardType)
    },
    SET_PLAYERS(state, players) {
      state.players = players
    },
    ADD_PLAYER(state, playerId) {
      if (state.players.indexOf(playerId) === -1) {
        state.players.push(playerId)
      }
    },
    REMOVE_PLAYER(state, playerId) {
      state.players = state.players.filter(id => playerId !== id)
    },
    SET_USER(state, userId) {
      state.user = userId
    },
    SET_WINNER(state, playerId) {
      state.result = {
        winner: playerId
      }
    },
    SET_LOSER(state, playerId) {
      state.result = {
        loser: playerId
      }
    }
  },
  actions: {
    addRandomCard({ commit }) {
      commit('ADD_CARD', getRandomCard())
    },
    signup({ commit }, { name, password }) {
      return axios
        .post('/api/users', { name, password })
        .then(response => response.data)
        .then(data => {
          commit('SET_USER', data)
        })
    }
  },
  getters: {
    isLoggedIn: state => !!state.user
  },
  modules: {}
})

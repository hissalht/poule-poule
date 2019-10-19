import io from 'socket.io-client'
import store from './store'

const socket = io()

socket.on('connect', () => {
  socket.emit('pp:join' /* , lobby id */, ({ cardStack, players }) => {
    store.commit('SET_CARDS', cardStack)
    store.commit('SET_PLAYERS', players)
  })
})

socket.on('pp:card', cardType => {
  store.commit('ADD_CARD', cardType)
})

socket.on('pp:join', playerId => {
  console.log('new player joined')
  store.commit('ADD_PLAYER', playerId)
})

socket.on('pp:leave', playerId => {
  store.commit('REMOVE_PLAYER', playerId)
})

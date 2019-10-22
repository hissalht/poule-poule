import io from 'socket.io-client'
import store from './store'

const socket = io()

socket.on('connect', () => {
  socket.emit(
    'pp:join' /* , lobby id */,
    ({ cardStack, players, currentPlayer }) => {
      store.commit('SET_CARDS', cardStack)
      store.commit('SET_PLAYERS', players)
      store.commit('SET_USER', currentPlayer)
    }
  )
})

socket.on('pp:card', cardType => {
  store.commit('ADD_CARD', cardType)
})

socket.on('pp:join', playerId => {
  store.commit('ADD_PLAYER', playerId)
})

socket.on('pp:leave', playerId => {
  store.commit('REMOVE_PLAYER', playerId)
})

socket.on('pp:winner', player => {
  store.commit('SET_WINNER', player)
})

socket.on('pp:loser', player => {
  store.commit('SET_LOSER', player)
})

export default socket

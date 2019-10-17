import io from 'socket.io-client';
import store from './store';

const socket = io();

socket.on('connect', () => {
  console.log('connected');
});

socket.on('pp:card', cardType => {
  console.log('TCL: cardType', cardType);
  store.commit('ADD_CARD', cardType);
});

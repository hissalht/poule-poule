const io = require('socket.io')();

const { getRandomCard } = require('poule-poule-lib');

io.on('connection', socket => {
  console.log('A user connected');
  const timerId = setInterval(() => {
    socket.emit('pp:card', getRandomCard());
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(timerId);
  });
});

module.exports = io;

const express = require('express')
const path = require('path')
const logger = require('morgan')
const io = require('socket.io')()
const Lobby = require('./utils/Lobby')

// default lobby config
const lobby = new Lobby(io)

lobby.onPlayerJoin(id => {
  console.log(`Player ${id} joined lobby ${lobby.id}`)
})

lobby.onPlayerLeave(id => {
  console.log(`Player ${id} left lobby ${lobby.id}`)
})

/**
 * Configure the express application.
 * @param {express.Application} app
 */
function configureServer(app) {
  app.use(logger('dev'))
  app.use(express.static(path.join(__dirname, 'public')))
  app.io = io
}

module.exports = configureServer

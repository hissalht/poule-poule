import express from 'express'
import { join } from 'path'
import logger from 'morgan'
import socketio from 'socket.io'
import Lobby from './utils/Lobby'

const io = socketio()

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
  app.use(express.static(join(__dirname, '../public')))
  app.io = io
}

export default configureServer

import _ from 'lodash'
import PlayerAlreadyInLobby from './errors/PlayerAlreadyInLobby'
import PlayerNotInLobby from './errors/PlayerNotInLobby'

export default class Lobby {
  constructor(io) {
    this.id = _.uniqueId()
    this.io = io
    this.players = []
    this.cardStack = []

    this.callBacks = {
      onPlayerJoin: null,
      onPlayerLeave: null
    }

    this._configureIO()
  }

  /**
   * @private
   */
  _configureIO() {
    const io = this.io
    io.on('connection', socket => {
      socket.on('pp:join', answer => {
        socket.join(this.id)
        this.join(socket.id)
        answer({
          players: this.players,
          cardStack: this.cardStack
        })
      })

      socket.on('pp:leave', () => {
        socket.leave(this.id)
        this.leave(socket.id)
      })

      socket.on('disconnect', () => {
        socket.leave(this.id)
        this.leave(socket.id)
      })
    })
  }

  emit(event, args) {
    return this.io.to(this.id).emit(event, args)
  }

  /**
   * Add a player to the lobby.
   * @throws {PlayerAlreadyInLobby}
   * @param {string} playerId
   */
  join(playerId) {
    if (_.indexOf(this.players, playerId) !== -1) {
      throw new PlayerAlreadyInLobby(playerId, this.id)
    }
    this.players.push(playerId)
    this.emit('pp:join', playerId)
    _.invoke(this.callBacks, 'onPlayerJoin', playerId)
  }

  /**
   * Remove a player from the lobby.
   * @throws {PlayerNotInLobby}
   * @param {string} playerId
   */
  leave(playerId) {
    if (_.indexOf(this.players, playerId) === -1) {
      throw new PlayerNotInLobby(playerId, this.id)
    }
    _.pull(this.players, playerId)
    this.emit('pp:leave', playerId)
    _.invoke(this.callBacks, 'onPlayerLeave', playerId)
  }

  /**
   * @param {onPlayerJoinCallback} cb
   */
  onPlayerJoin(cb) {
    this.callBacks.onPlayerJoin = cb
  }

  /**
   * @param {onPlayerLeaveCallback} cb
   */
  onPlayerLeave(cb) {
    this.callBacks.onPlayerLeave = cb
  }
}

/**
 * @callback onPlayerJoinCallback
 * @param {string} playerId
 */

/**
 * @callback onPlayerLeaveCallback
 * @param {string} playerId
 */

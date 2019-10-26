class PlayerNotInLobby extends Error {
  /**
   * @param {string} playerId
   * @param {string} lobbyId
   */
  constructor(playerId, lobbyId) {
    super(`Player [${playerId}] is not in lobby [${lobbyId}]`)
    this.name = 'PlayerNotInLobby'
    this.playerId = playerId
    this.lobbyId = lobbyId
  }
}

export default PlayerNotInLobby

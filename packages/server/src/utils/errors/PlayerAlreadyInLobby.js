class PlayerAlreadyInLobby extends Error {
  /**
   * @param {string} playerId
   * @param {string} lobbyId
   */
  constructor(playerId, lobbyId) {
    super(`Player [${playerId}] already in lobby [${lobbyId}]`)
    this.name = 'PlayerAlreadyInLobby'
    this.playerId = playerId
    this.lobbyId = lobbyId
  }
}

export default PlayerAlreadyInLobby

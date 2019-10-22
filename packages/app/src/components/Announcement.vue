<template>
  <p>
    {{ resultText }}
  </p>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Announcement',
  computed: {
    ...mapState(['result', 'user']),
    resultType() {
      console.log(this.result)
      if (!this.result) {
        return null
      }
      if (this.result.winner) {
        return 'winner'
      } else if (this.result.loser) {
        return 'loser'
      } else {
        return null
      }
    },
    player() {
      return this.result && (this.result.winner || this.result.loser)
    },
    playerName() {
      return this.player === this.user ? 'YOU' : this.player
    },
    resultText() {
      if (!this.resultType) {
        return 'No result.'
      } else {
        return `A ${this.resultType} is ${this.playerName} !`
      }
    }
  }
}
</script>

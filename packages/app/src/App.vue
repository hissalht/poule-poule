<template>
  <div>
    <announcement />
    <button @click="handleButtonClick">HIT</button>
    <p>Eggs : {{ eggCount }}</p>
    <card v-if="lastCard" :type="lastCard" />
    <h3>Players</h3>
    <ul>
      <li v-for="player in players" :key="player">
        {{ player }}
        <template v-if="player === user">
          (you)
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getEggCount } from 'poule-poule-lib'
import Card from '@/components/Card'
import Announcement from '@/components/Announcement'
import io from './io'

console.log(io)

export default {
  name: 'App',
  components: {
    Card,
    Announcement
  },
  computed: {
    ...mapState(['cardStack', 'players', 'user']),
    eggCount() {
      return getEggCount(this.cardStack)
    },
    lastCard() {
      return this.cardStack[this.cardStack.length - 1]
    }
  },
  methods: {
    ...mapActions(['addRandomCard']),
    handleButtonClick() {
      io.emit('pp:hit')
    }
  }
}
</script>

<style lang="scss" scoped>
.spacer {
  height: 150px;
}
</style>

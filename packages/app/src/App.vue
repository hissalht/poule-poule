<template>
  <div>
    <button @click="handleButtonClick">Add random card</button>
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

export default {
  name: 'App',
  components: {
    Card
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
      this.addRandomCard()
    }
  }
}
</script>

<style lang="scss" scoped>
.spacer {
  height: 150px;
}
</style>

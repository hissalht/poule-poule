<template>
  <div>
    <span>{{ cardText }}</span>
  </div>
</template>

<script>
import { CardType } from 'poule-poule-lib'
export default {
  name: 'Card',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    cardText() {
      switch (this.type) {
        case CardType.EGG:
          return '🥚'
        case CardType.CHICKEN:
          return '🐔'
        case CardType.FOX:
          return '🦊'
        case CardType.DOG:
          return '🐶 '
        case CardType.DUCK:
          return '🦆'
        default:
          throw new Error('Unknown card type', this.type)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100px;
  height: 150px;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  background-color: white;
  box-shadow: 0 0 4px #00000044;

  span {
    font-size: 48pt;
  }
}
</style>

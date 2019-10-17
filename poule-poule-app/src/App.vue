<template>
  <div>
    <label>
      Expand
      <input type="checkbox" v-model="expand" />
    </label>
    <button @click="handleButtonClick">Add random card</button>
    <p>Eggs : {{ eggCount }}</p>
    <ol>
      <li v-for="(card, index) in cardStack" :key="index" :class="{ expand }">
        <card :type="card" class="card" />
      </li>
    </ol>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getEggCount } from 'poule-poule-lib';
import Card from '@/components/Card';

export default {
  name: 'App',
  components: {
    Card
  },
  data: () => ({
    expand: false
  }),
  computed: {
    ...mapState(['cardStack']),
    eggCount() {
      return getEggCount(this.cardStack);
    }
  },
  created() {
    this.addRandomCard();
    this.addRandomCard();
    this.addRandomCard();
    this.addRandomCard();
  },
  methods: {
    ...mapActions(['addRandomCard']),
    handleButtonClick() {
      this.addRandomCard();
    }
  }
};
</script>

<style lang="scss" scoped>
ol {
  list-style: none;
  padding: 0;
  li {
    height: 3px;
    transition: height 0.25s linear;
    &.expand {
      height: 100px;
    }
  }
  .card {
    position: absolute;
  }
}
</style>

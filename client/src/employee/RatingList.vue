<template>

  <div class="ratings" v-if="ready">
    <rating v-for="rating in ratings"
             :rating="rating"
             :key="rating.id"></rating>
  </div>

  <div v-else>
    <loading></loading>
  </div>

</template>

<script>
import Loading from '../components/Loading.vue'
import Rating from './Rating.vue'

export default {
  components: {
    Loading,
    Rating,
  },

  props: ['maybeRatings'],

  computed: {
    ready() {
      return this.maybeRatings.matchWith({
        Just: () => true,
        Nothing: () => false
      })
    },
    ratings() {
      return this.maybeRatings.getOrElse([])
    }
  }
}
</script>

<style scoped>
.ratings {
  padding: 1em;
  background-color: var(--tertiary-color);
}
</style>

<template>
  <div class="rating">
    <p class="text">{{ rating.text }}</p>
    <div class="info">
      <star-rating
          class="rating"
          :rating="rating.value"
          :hideText="true"></star-rating>
      <p class="user">{{ rating.user }}</p>
    </div>
  </div>
</template>

<script>
import StarRating from '../components/StarRating.vue'

export default {
  props: ['rating'],
  components: {
    StarRating,
  },
}
</script>

<style scoped>
.rating {
  background-color: var(--secondary-color);
  padding: 0.5em;
  margin-bottom: 1em;
}

.rating:last-child {
  margin-bottom: 0;
}

.text {
  margin: 0 0 0.5em 0;
}

.info {
  display: flex;
}

.rating {
  align-self: flex-start;
}

.user {
  margin: 0 0.5em 0 auto;
  font-weight: 600;
  color: var(--primary-color);
}
</style>

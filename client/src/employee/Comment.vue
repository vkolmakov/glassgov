<template>
  <div class="comment">
    <p class="text">{{ comment.text }}</p>
    <div class="info">
      <star-rating
          class="rating"
          :rating="comment.rating"
          :hideText="true"></star-rating>
      <p class="user">{{ comment.user }}</p>
    </div>
  </div>
</template>

<script>
import StarRating from '../components/StarRating.vue'

export default {
  props: ['comment'],
  components: {
    StarRating,
  },
}
</script>

<style scoped>
.comment {
  background-color: var(--secondary-color);
  padding: 0.5em;
  margin-bottom: 1em;
}

.comment:last-child {
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

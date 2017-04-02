<template>

  <div class="comments" v-if="ready">
    <comment v-for="comment in comments"
             :comment="comment"
             :key="comment.id"></comment>
  </div>

  <div v-else>
    <loading></loading>
  </div>

</template>

<script>
import Loading from '../components/Loading.vue'
import Comment from './Comment.vue'

export default {
  components: {
    Loading,
    Comment,
  },

  props: ['maybeComments'],

  computed: {
    ready() {
      return this.maybeComments.matchWith({
        Just: () => true,
        Nothing: () => false
      })
    },
    comments() {
      return this.maybeComments.getOrElse([])
    }
  }
}
</script>

<style scoped>
.comments {
  padding: 1em;
  background-color: var(--tertiary-color);
}
</style>
